import json
import os
from scipy.spatial import distance
from langchain_openai import OpenAIEmbeddings
import numpy as np
from sklearn.cluster import KMeans
import teams_functions

# OpenAI API 키 설정
api_key = "####"
embeddings_model = OpenAIEmbeddings(api_key=api_key)

# 문장들의 리스트
documents = teams_functions.arrays



# 임베딩 파일 경로 설정
embeddings_file = 'embeddings.json'

def save_embeddings_to_file(embeddings, filename):
    """임베딩 벡터를 JSON 파일로 저장합니다."""
    with open(filename, 'w') as file:
        json.dump(embeddings, file)

def load_embeddings_from_file(filename):
    """JSON 파일에서 임베딩 벡터를 로드합니다."""
    with open(filename, 'r') as file:
        embeddings = json.load(file)
    return np.array(embeddings)

# 파일이 존재하는지 확인하고, 없다면 임베딩 생성 후 저장
if not os.path.exists(embeddings_file):
    embeddings = embeddings_model.embed_documents(documents)
    save_embeddings_to_file(embeddings, embeddings_file)
    embeddings_array = np.array(embeddings)  # 임베딩을 생성하고 배열로 변환
    print("임베딩 진행 (유료)")
else:
    embeddings_array = load_embeddings_from_file(embeddings_file)  # 파일에서 로드만 하면 됨
    print("이미 임베딩 있음 (무료)")

# K-means 클러스터링을 수행
kmeans = KMeans(n_clusters=100, random_state=0).fit(embeddings_array)

# 클러스터 결과 출력
# print("Cluster labels:", kmeans.labels_)

# 클러스터별로 문장 그룹화
cluster_groups = {}
for doc, label in zip(documents, kmeans.labels_):
    if label not in cluster_groups:
        cluster_groups[label] = []
    cluster_groups[label].append(doc)

# 클러스터별 문장 출력
for cluster, docs in cluster_groups.items():
    print(f"\nCluster {cluster}:")
    for doc in docs:
        print(doc)










def get_closest_cluster(embedding, model):
    """주어진 임베딩에 가장 가까운 클러스터 레이블을 반환합니다."""
    distances = [distance.euclidean(embedding, center) for center in model.cluster_centers_]
    return np.argmin(distances)

def get_top_documents(embedding, documents, embeddings, top_n=5):
    """임베딩과 가장 유사한 상위 N개의 문서를 반환합니다."""
    distances = [distance.euclidean(embedding, doc_embedding) for doc_embedding in embeddings]
    sorted_docs_indices = np.argsort(distances)
    return [documents[idx] for idx in sorted_docs_indices[:top_n]]

while True:
    user_input = input("문장을 입력하세요 (종료하려면 '종료' 입력): ")
    if user_input.lower() == "종료":
        break

    # 입력받은 문장의 임베딩 생성
    user_embedding = embeddings_model.embed_documents([user_input])[0]

    # 입력받은 문장의 임베딩이 속하는 클러스터 찾기
    closest_cluster = get_closest_cluster(user_embedding, kmeans)
    print(f"가장 가까운 클러스터: Cluster {closest_cluster}")

    # 해당 클러스터 내의 문서들
    cluster_documents = cluster_groups[closest_cluster]
    cluster_embeddings = [embeddings_array[documents.index(doc)] for doc in cluster_documents]

    # 해당 클러스터 내에서 가장 가까운 문장 5개 가져오기
    top_cluster_documents = get_top_documents(user_embedding, cluster_documents, cluster_embeddings)
    print("클러스터 내 입력 문장과 가장 유사한 문장 5개:")
    for doc in top_cluster_documents:
        print(doc)

    # 전체 문서 중에서 가장 가까운 문장 5개 가져오기
    top_documents = get_top_documents(user_embedding, documents, embeddings_array)
    print("전체 문서 중 입력 문장과 가장 유사한 문장 5개:")
    for doc in top_documents:
        print(doc)
