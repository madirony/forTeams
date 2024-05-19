
import sqlite3


import sqlite3

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





def fetch_all_records(db_path='example.db'):
    # 데이터베이스에 연결
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 모든 레코드 조회
    c.execute("SELECT * FROM recommendations")
    all_records = c.fetchall()

    # 데이터베이스 연결 종료
    conn.close()

    # 결과 출력
    for record in all_records:
        print(record)


def fetch_records_by_category(db_path='example.db', category="화상 회의_참가자 초대"):
    # 데이터베이스에 연결
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # 주어진 카테고리에 맞는 레코드를 click이 높은 순, 같다면 최신 created 순으로 조회
    c.execute('''
    SELECT * FROM recommendations
    WHERE category = ?
    ORDER BY click DESC, created DESC
    LIMIT 100
    ''', (category,))

    records = c.fetchall()

    # 데이터베이스 연결 종료
    conn.close()

    # 결과 출력
    for record in records:
        print(record)


def initialize_and_insert_data(db_file, user_uid, nickname, function, dept):
    """ 데이터베이스 연결, 테이블 생성 및 데이터 삽입을 한 번에 수행합니다. """
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
            dept TEXT NOT NULL
        )
        """)
        print("Table created or already exists.")

        # 데이터 삽입
        conn.execute("INSERT INTO userHistory (user_uid, nickname, function, dept) VALUES (?, ?, ?, ?)",
                     (user_uid, nickname, function, dept))
        conn.commit()  # 트랜잭션 커밋
        print("Record inserted successfully")

    except Exception as e:
        print(e)
        conn.rollback()  # 오류 발생 시 롤백
    finally:
        conn.close()  # 데이터베이스 연결 닫기





# fetch_records_by_category(category="화상 회의_참가자 초대")
# fetch_all_records()