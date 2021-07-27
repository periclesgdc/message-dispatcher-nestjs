#!/usr/bin/env groovy
pipeline {
  agent {
    docker {
      image 'node:15-alpine3.13'
      args '-p 3000:3000'
    }
  }
  stages {
    stage('Install') {
      steps {
        sh "npm install -g serve"
        sh "npm install"
        echo "Install success"
      }
    }
    stage('Build') {
      steps {
        sh "npm run build"
        echo "Build success"
      }
    }
    stage('Deliver') {
      steps {
        echo "Test echo"
      }
    }
  }
}