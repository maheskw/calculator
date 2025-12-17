pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yourdockerhubusername/node-calculator"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKER_CREDENTIALS_ID,
                    usernameVariable: 'docker login -u mahesperumal',
',
                    passwordVariable: 'dckr_pat_AAHpu92P1nsNmyT-cR27U7WwFe0'
                )]) {
                    sh '''
                     docker login -u %docker login -u mahesperumal% -p %dckr_pat_AAHpu92P1nsNmyT-cR27U7WwFe0%
                    docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }
    }
}