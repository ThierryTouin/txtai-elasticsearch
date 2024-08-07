# txtai-elasticsearch

## Schema

```mermaid
graph LR

C1[Client]
E[Elasticsearch]
T[TxtAI]

C1 --0-load data--> C1
C1 --1-get vector--> T
T --2-return vector--> C1
C1 --3-push data+vector--> E
C1 --4-request cos--> E

classDef S1 fill:#f9f,stroke:#333,stroke-width:2px;
classDef S2 fill:#ccf,stroke:#333,stroke-width:2px;
classDef S3 fill:#9f9,stroke:#333,stroke-width:2px;

class C1,C2 S1;
class T S2;
class E S3;
```



## 1- Start stack 
```
./start-environnement.sh
```



## 2- Load datas

### Retrieve data from internet and create `data.json` file (if you have already the json data, you can jump this step.)
```
./get-data-from-web.sh
```

### Load `data.json` file in elasticsearch index
```
./load-data-in-elasticsearch.sh
```

## 3- Search data

```
./search.sh
```

NB:  You can search all datas with kibana query (http://localhost:5601)
```
GET /movies/_search
{
  "query": {
    "match_all": {}
  }  
}
```


## Issue
if elasticsearch has error : 
  ```
    Elasticsearch exited unexpectedly, with exit code 78
  ```
then execute the following command
  ```
    sudo sysctl -w vm.max_map_count=262144
  ```

## Liens
https://medium.com/bigdata-blog/how-to-use-elasticsearch-as-vector-database-5f1768f7d46a


## Vrac

curl -X GET "http://localhost:8000/transform?text=RE%3A+Would+machine+learning+be+suitable+for+finding+the+seed+of+a+random+number+generator%3F+Machine"



curl -X POST "http://localhost:8000/add" -H "Content-Type: application/json" -d '[{"text": "text"}]'

https://blog.gcn.sh/howtos/installing-libretranslate-using-docker-and-ubuntu





"I'm looking for a crime thriller with a very gray future world."



