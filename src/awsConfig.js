const awsConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1', // Change to your region

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_GM4cvCrwG', // Replace with your User Pool ID

    // OPTIONAL - Amazon Cognito Web Client ID (App client ID)
    userPoolWebClientId: '3s93873e97qp0a1ve5b68830n1', // Replace with your App Client ID
  },
};

export default awsConfig;
