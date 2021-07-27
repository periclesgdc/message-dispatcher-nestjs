#!/usr/bin/env groovy
pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:15-alpine3.13'
                }
            }
            steps {
                sh "npm start" 
            }
        }
    }
}