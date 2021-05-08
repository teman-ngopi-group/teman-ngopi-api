## Node CRUD apps

A simple rest api used to CRUD operation with user authentication.

### How to run the apps :

#### 1. Clone the repository
```
$ https://github.com/SutantoAdiNugroho/node-crud-docker.git
```

#### 2. Install dependencies
```
$ cd node-crud-docker
```
and then
```
$ npm install
```

#### 3. Configure .env file on the project
There is already a sample env file, and all the keywords from the env file must be filled in.

| Keywords        | Description                      |
| ----------------|----------------------------------|
| HOST_DB         | MongoDB host connection          |
| PORT            | Port to run the apps             |
| JWT_SECRET_KEY  | Key for build and sync JWT token |

#### 4. Launch the apps
Example command for running it locally :
```
$ npm run dev
```

Example running it by kubernetes cluster :

* Dockerizing the project
    ```
    $ docker build -t node-crud .
    ```
    After build process done, then we can check it by execute the container
    ```
    $ docker run -p 8080:8080 node-crud
    ```
* Upload the image to docker hub
    ```
    $ docker tag node-crud {username}/{repository}
    ```
    Then push it into repository
    ```
    $ docker push {username}/{repository}
    ```
* Start kubernetes cluster
    ```
    $ minikube start
    ```
    Then back to project folder for creating deployment into kubernetes cluster
    ```
    $ kubectl create -f deploy.yaml
    ```
* Expose deployment
    ```
    $ kubectl expose deployment {name_deployment} --type "LoadBalancer"
    ```
    We can see, the service has been created
    ```
    $ kubectl get svc
    ```

After the apps running is succesfully, we can start by calling routes. For example :
![Alt text](./src/assets/img/1.1-home.png "Calling '/' route")

