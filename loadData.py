from elasticsearch import Elasticsearch
from openai import OpenAI

es_client = Elasticsearch(
    "https://localhost:9200" #,
    #ssl_assert_fingerprint='AA:BB:CC:3C:A4:99:12:A8:D6:41:B7:A6:52:ED:CA:2E:0E:64:E2:0E:A7:8F:AE:4C:57:0E:4B:A3:00:11:22:33',
    #basic_auth=("elastic", "passw0rd")
)
openai_client = OpenAI(api_key='<openAI-API-key>')

movies = [
    {"title": "Inception", "genre": "Sci-Fi", "release_year": 2010},
    {"title": "The Shawshank Redemption", "genre": "Drama", "release_year": 1994},
    {"title": "The Godfather", "genre": "Crime", "release_year": 1972},
    {"title": "Pulp Fiction", "genre": "Crime", "release_year": 1994},
    {"title": "Forrest Gump", "genre": "Drama", "release_year": 1994}
]

# Indexing movies
for movie in movies:
    movie['title_embedding'] = openai_client.embeddings.create(
        input=[movie['title']], model='text-embedding-3-small'
    ).data[0].embedding
    es_client.index(index="movies", document=movie)


