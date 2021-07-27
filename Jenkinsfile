#!/usr/bin/env groovy
pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh "npm install -g serve"
                sh "npm install"
                sh "npm run build"
                sh "serve -s -p 3000 dist"
            }
        }
    }
}