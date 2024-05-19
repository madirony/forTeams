
import sqlite3
from datetime import datetime, timedelta
from sklearn.cluster import KMeans
import numpy as np



def fetch_all_records(db_path='example.db'):
    # 데이터베이스에 연결
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 모든 레코드 조회
    c.execute("SELECT * FROM userHistory")
    all_records = c.fetchall()

    # 데이터베이스 연결 종료
    conn.close()

    # 결과 출력
    for record in all_records:
        print(record)


def fetch_records_by_category(db_path='example.db', category="화상 회의_참가자 초대", userUid="aoweifjefu", n_clusters=5):
    # 데이터베이스에서 데이터 추출
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 테이블 없으면 생성
    c.execute('''
        CREATE TABLE IF NOT EXISTS recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            click INTEGER,
            question TEXT,
            created DATETIME,
            embedding BLOB
        )
        ''')
    c.execute('''
                SELECT r.question, r.click, r.embedding 
                FROM recommendations r
                LEFT JOIN userHistory u
                ON r.question = '"' || u.message || '"' AND u.user_uid = ?
                WHERE r.category = ? AND '"' || u.message || '"' IS NULL
                ORDER BY r.click DESC, r.created DESC
            ''', (user_uid, category))

    records = c.fetchall()
    conn.close()

    # 질문, 클릭 수, 임베딩 분리
    questions = [record[0] for record in records]
    clicks = [record[1] for record in records]

    if len(records) == 0:

        print(category + " 카테고리는 저장된 질문이 하나도 없네요")
        return []

    if len(records) <= 5:
        # 5개 이하의 기록은 클릭 수가 높은 순으로 반환
        print(category + " 카테고리는 딱히 클러스터링이 필요하지 않아요.")
        return questions

    print(category + " 카테고리는 클러스터링이 필요하네요")
    # 5개 이상의 기록이 있을 때 클러스터링 실행
    embeddings = [np.frombuffer(record[2], dtype=np.float32) for record in records]


    # 클러스터링
    kmeans = KMeans(n_clusters=n_clusters, random_state=0)
    kmeans.fit(embeddings)

    # 클러스터 결과 할당
    clusters = {i: [] for i in range(n_clusters)}
    for idx, label in enumerate(kmeans.labels_):
        clusters[label].append((questions[idx], clicks[idx]))

    # 클러스터별로 클릭 수가 가장 높은 질문 선택 및 클러스터의 총 클릭 수 계산
    cluster_summary = []
    for label, qs in clusters.items():
        if qs:
            top_question = max(qs, key=lambda x: x[1])[0]  # 클릭 수 기준으로 최대값 선택
            total_clicks = sum(click[1] for click in qs)  # 클러스터의 총 클릭 수
            cluster_summary.append((total_clicks, top_question))

    # 클러스터의 총 클릭 수를 기준으로 정렬하고 결과 반환
    cluster_summary.sort(reverse=True, key=lambda x: x[0])
    result = [item[1] for item in cluster_summary]

    return result





def create_table(db_path='example.db'):
    # 데이터베이스에 연결
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 테이블 생성
    c.execute('''
    CREATE TABLE IF NOT EXISTS recommendations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        click INTEGER,
        question TEXT,
        created DATETIME,
        embedding BLOB
    )
    ''')
    print("Table 'recommendations' created or verified successfully.")

    # 데이터베이스 연결 종료
    conn.close()

def insert_record_with_embedding(db_path, category, click, question, embedding):
    # 데이터베이스에 연결
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 테이블 존재 여부 확인 및 생성
    c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='recommendations'")
    if not c.fetchone():
        create_table(db_path)

    # 동일한 question이 있는지 확인
    c.execute("SELECT 1 FROM recommendations WHERE question = ?", (question,))
    if c.fetchone():
        print("Record with this question already exists.")
    else:
        # 현재 시간과 numpy 배열을 BLOB으로 변환
        current_time = datetime.now()
        embedding_blob = sqlite3.Binary(np.array(embedding, dtype=np.float32).tobytes())

        # 레코드 삽입
        c.execute('''
        INSERT INTO recommendations (category, click, question, created, embedding)
        VALUES (?, ?, ?, ?, ?)
        ''', (category, click, question, current_time, embedding_blob))

        # 변경사항 저장
        conn.commit()
        print("A new record has been inserted into 'recommendations'.")

    # 데이터베이스 연결 종료
    conn.close()


def fetch_all_history(db_file = "example.db"):
    """ 데이터베이스에서 모든 데이터를 조회하고 출력합니다. """
    try:
        # 데이터베이스 파일에 연결
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        print(f"Connected to SQLite, version {sqlite3.version}")

        # 모든 데이터 조회
        cursor.execute("SELECT * FROM userHistory")
        records = cursor.fetchall()

        # 조회된 데이터 출력
        print("Fetching all data from userHistory:")
        for row in records:
            print(
                f"History No: {row[0]}, User UID: {row[1]}, Nickname: {row[2]}, Function: {row[3]}, Department: {row[4]}, date: {row[5]}, message: {row[6]}")

    except Exception as e:
        print(e)
    finally:
        conn.close()  # 데이터베이스 연결 닫기



from collections import Counter

def fetch_user_function_usage(db_file, user_uid):
    """ 주어진 사용자 UID에 대해 데이터베이스에서 기능 사용 기록을 조회하고, 각 기능별 사용 횟수를 계산합니다. """
    try:
        # 데이터베이스 파일에 연결
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        print(f"Connected to SQLite, version {sqlite3.version}")

        # 주어진 UID에 대한 최근 100개 기록 조회
        query = """
        SELECT function
        FROM userHistory
        WHERE user_uid = ?
        ORDER BY date DESC
        LIMIT 100
        """
        cursor.execute(query, (user_uid,))
        functions = cursor.fetchall()

        # 기능별 사용 횟수 계산
        function_count = Counter(function[0] for function in functions)

        # 결과를 리스트로 정리하여 출력
        result = {
            "functions": [
                {"function": function, "count": count}
                for function, count in function_count.most_common()
            ]
        }
        return result

    except Exception as e:
        print(e)
    finally:
        conn.close()  # 데이터베이스 연결 닫기



def initialize_and_insert_data(db_file, user_uid, nickname, function, dept, message):
    """ 데이터베이스 연결, 테이블 생성 및 데이터 삽입을 한 번에 수행하며 현재 날짜도 기록합니다. """
    try:
        # 데이터베이스 파일에 연결
        conn = sqlite3.connect(db_file)
        print(f"Connected to SQLite, version {sqlite3.version}")

        # userHistory 테이블 생성
        conn.execute("""
        CREATE TABLE IF NOT EXISTS userHistory (
            history_no INTEGER PRIMARY KEY AUTOINCREMENT,
            user_uid TEXT NOT NULL,
            nickname TEXT NOT NULL,
            function TEXT NOT NULL,
            dept TEXT NOT NULL,
            date TEXT NOT NULL,
            message TEXT NOT NULL
        )
        """)
        print("Table created or already exists.")

        # 현재 날짜 가져오기
        current_date = datetime.now().strftime('%Y-%m-%d')

        # 데이터 삽입
        conn.execute("""
        INSERT INTO userHistory (user_uid, nickname, function, dept, date, message) VALUES (?, ?, ?, ?, ?, ?)
        """, (user_uid, nickname, function, dept, current_date, message))
        conn.commit()  # 트랜잭션 커밋
        print("Record inserted successfully with current date.")

    except Exception as e:
        print(e)
        conn.rollback()  # 오류 발생 시 롤백
    finally:
        conn.close()  # 데이터베이스 연결 닫기


def fetch_most_used_functions_by_dept(db_file, department):
    """ 특정 부서의 최근 한 달간 가장 많이 사용한 기능과 사용 횟수를 조회합니다. """
    try:
        # 데이터베이스 파일에 연결
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()

        # 현재 날짜에서 한 달 전 날짜 계산
        one_month_ago = datetime.now() - timedelta(days=30)
        one_month_ago_date = one_month_ago.strftime('%Y-%m-%d')

        # 특정 부서의 최근 한 달간 가장 많이 사용된 기능 조회
        cursor.execute("""
        SELECT function, COUNT(*) as usage_count
        FROM userHistory
        WHERE dept = ? AND date >= ?
        GROUP BY function
        ORDER BY usage_count DESC
        LIMIT 5
        """, (department, one_month_ago_date))
        records = cursor.fetchall()

        # 조회된 데이터 출력 및 반환
        result = []
        print(f"Most used functions in department {department} for the last month:")
        for function, count in records:
            result.append((function.split("_")[1], count))
            print(f"Function: {function}, Count: {count}")
        return result

    except Exception as e:
        print(e)
    finally:
        conn.close()  # 데이터베이스 연결 닫기







# fetch_records_by_category(category="화상 회의_참가자 초대")




# 더미데이터 생성용



from LangchainRepository.recommandation.recommandation import questionRecommandation

# "조직 외부 사용자 추가 또는 초대_외부 사용자 채팅 초대"
# 에 대한 질문 리스트

def makeData(title, questions):

    i = 1
    for idx in questions:
        insert_record_with_embedding("example.db", title, 0, idx,
                                     questionRecommandation.getEmbedding(idx))
        print(idx)
        print(str(i) + " / " + str(len(questions)))
        i += 1


def initData():
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 이메일로 초대", [
        "조직 외부 사용자에게 권한의 유효기간을 정해줄 수 있나요?",
        "조직 외부 사용자의 이메일을 모르면 어떻게 해야 하나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자에게 초대 링크 전송", [
        "초대 링크 전송시 딜레이가 있나요?",
        "초대 링크 전송을 철회할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자의 게스트 액세스 승인", [
        "외부 사용자가 만약 액세스 승인을 안하면 어떻게 초대할 수 있나요?",
        "외부 사용자가 팀즈 계정이 없는 경우엔 어떻게 초대할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자의 게스트 액세스 거부", [
        "외부 사용자 엑세스 가능 유효기간을 설정할 수 있나요?",
        "조직 외부 사용자중 필터링을 할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 역할 설정", [
        "조직 외부 사용자의 역할의 변동 기록을 확인할 수 있나요?"
        "외부 사용자를 역할별로 모아서 확인할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 액세스 권한 설정", [
        "외부 사용자에게 액세스 권한을 부분적으로 주고싶으면 어떻게 하나요?",
        "액세스 가능 유효기간을 설정할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 초대 유효기간 설정", [
        "초대 유효기간을 과거로 설정하면 어떻게 되나요?",
        "외부 사용자가 초대를 거절했는지 확인하는 방법이 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 초대 상태 확인", [
        "외부 사용자가 초대를 승인했을 때 알림을 받을 수 있나요?",
        "외부 사용자에게 초대를 재전송할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 초대 재전송", [
        "조직 외부 사용자에게 초대를 재전송하면 알림이 두번 가나요?",
        "조직 외부 사용자가 초대를 거절했는지 알 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자에게 특정 채널 접근 허용", [
        "조직 외부 사용자에게 모든 채널에 대한 접근을 허용하는 방법이 있나요?",
        "조직 외부 사용자에게 특정 채널에 대한 접근 유효기간을 줄 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자에게 특정 채널 접근 금지", [
        "조직 외부 사용자에게 특정 채널에 대한 접근 유효기간을 줄 수 있나요?",
        "조직 외부 사용자를 카테고리화 하여 접근권한을 관리할 수는 없나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 채팅 초대", [
        "조직 외부 사용자에게 채팅 읽기권한만 줄 수 있나요?",
        "조직 외부 사용자를 채팅에서 내보낼 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자에게 파일 공유", [
        "조직 외부 사용자에게 파일을 공유하고 차단하면 상대가 알 수 있나요?",
        "조직 외부 사용자가 파일을 받지 못하는 이유가 뭔가요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자와 공동 작업 설정", [
        "조직 외부 사용자에게 공동 작업을 설정했는데 외부 사용자가 작업을 안해요",
        "조직 외부 사용자가 초대를 못받은 것 같은데 어떻게 확인하죠?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 초대 취소", [
        "조직 외부 사용자를 초대했다가 취소하면 상대가 알 수 있나요?",
        "조직 외부 사용자가 초대를 승인할 수 있는 유효기한을 설정할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자의 참여 활동 로그 확인", [
        "조직 외부 사용자의 로그를 확인하고, 어떻게 활용할 수 있나요?",
        "조직 외부 사용자의 로그를 시각화할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 보안 정책 적용", [
        "조직 외부 사용자들을 카테고리화해서 보안 정책을 적용할 수 있나요?",
        "특정 보안 정책을 가지고있는 조직 외부 사용자를 모아서 볼 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 데이터 보호 설정", [
        "조직 외부 사용자의 데이터가 유출된 경우 어떻게 하나요?",
        "조직 외부 사용자가 사내 데이터를 유출하려 하는 경우 어떻게 추적할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 회의 초대", [
        "조직 외부 사용자가 회의에 노쇼하는 경우 차단할 수 있나요?",
        "조직 외부 사용자에게 초대 전송 예약을 할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자와의 공유 드라이브 설정", [
        "조직 외부 사용자가 공유 드라이브의 일부분만 접근할 수 있도록 할 수 있나요?"
        "조직 외부 사용자에게 접근 권한 유효기간을 설정할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자에 대한 교육 자료 제공", [
        "조직 외부 사용자에게 교육 자료를 제공하고, 일정 기간 이후 회수할 수 있나요?",
        "조직 외부 사용자에게 어떤 교육자료를 제공했는지 확인할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 액세스 제한 시간 설정", [
        "조직 외부 사용자를 카테고리화하여 액세스 제한시간을 일괄로 관리할 수 있나요?",
        "조직 외부 사용자가 액세스한 데이터의 기록을 확인할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자와의 커뮤니케이션 로그 저장", [
        "조직 외부 사용자와의 커뮤니케이션 로그를 삭제할 수 있나요?",
        "조직 외부 사용자와의 커뮤니케이션 로그를 시각화할 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 ID 확인", [
        "조직 외부 사용자의 id를 확인하고 또 어떤 정보를 확인할 수 있나요?",
        "조직 외부 사용자의 id로 조회할 수 있나요?"
    ])

    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자의 IT 지원 설정", [
        "조직 외부 사용자에게 IT 지원을 이후에 철회할 수 있나요?",
        "조직 외부 사용자의 IT 지원에 대한 이용 현황을 알 수 있나요?"
    ])
    makeData("조직 외부 사용자 추가 또는 초대_외부 사용자 활동에 대한 알림 설정", [
        "조직 외부 사용자의 특정 활동이 일어날 경우 조직 외부 사용자를 내보낼 수 있나요?",
        "조직 외부 사용자의 전체 활동 기록을 볼 수 있나요?"
    ])


def drop_userHistory_table(database_path):
    """
    userHistory_table 드롭
    """
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect(database_path)
        cursor = conn.cursor()

        # Drop the userHistory table
        cursor.execute("DROP TABLE IF EXISTS userHistory")

        # Commit the changes
        conn.commit()

        print("userHistory table dropped successfully.")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        # Close the connection
        if conn:
            conn.close()

# initData()
#print(fetch_records_by_category(category="조직 외부 사용자 추가 또는 초대_외부 사용자 채팅 초대"))


# fetch_all_records()

# drop_userHistory_table("example.db")
fetch_all_history()





db_file = "example.db"
user_uid = "aoweifjefu"
# print(fetch_user_function_usage(db_file, user_uid))