pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ahmedtarekk/nodejs-git-jenkins:latest"
        CONTAINER_PORT = "3000" // Replace with your desired port
        HOST_PORT = "3001" // Replace with the same port or map to another host port
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove any container with the same name
                    sh "docker rm -f test-container || true"

                    // Run the container
                    sh "docker run -d --name test-container -p ${HOST_PORT}:${CONTAINER_PORT} ${DOCKER_IMAGE}"
                }
            }
        }
      
        stage('Health Check') {
            steps {
                script {
                    // Wait for the container to start
                    sleep 5

                    // Check if the container is responding
                    sh "curl http://localhost:${HOST_PORT} || exit 1"
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials1', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        // Log in to DockerHub
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"

                        // Push the image
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up the test container
            script {
                sh "docker rm -f test-container || true"
            }
        }
    }
}
