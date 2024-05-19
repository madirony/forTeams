import json
import os
from scipy.spatial import distance
from langchain_openai import OpenAIEmbeddings
import numpy as np
from sklearn.cluster import KMeans
import teams_functions


# OpenAI API 키 설정
api_key = "환경변수"
embeddings_model = OpenAIEmbeddings(api_key=api_key)

# 문장들의 리스트
documents = teams_functions.arrays

# 임베딩 파일 경로 설정
embeddings_file = 'resources/embeddings.json'

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


def get_top_documents(embedding, documents, embeddings, top_n=5):
    """임베딩과 가장 유사한 상위 N개의 문서를 반환합니다."""
    distances = [distance.euclidean(embedding, doc_embedding) for doc_embedding in embeddings]
    sorted_docs_indices = np.argsort(distances)
    return [documents[idx] for idx in sorted_docs_indices[:top_n]]




# 문장들의 리스트
documents = teams_functions.arrays

class questionRecommandation():

    def getEmbedding(question):
        # 입력받은 문장의 임베딩 생성
        return embeddings_model.embed_documents([question])[0]




    def questionRecommandations(question) -> list:
        # 입력받은 문장의 임베딩 생성
        user_embedding = embeddings_model.embed_documents([question])[0]

        # 전체 문서 중에서 가장 가까운 문장 5개 가져오기
        top_documents = get_top_documents(user_embedding, documents, embeddings_array)

        return top_documents
