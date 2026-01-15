import boto3
from botocore.exceptions import ClientError
import os

COGNITO = boto3.client('cognito-idp', region_name=os.getenv("COGNITO_REGION"))
USER_POOL_ID = os.getenv("USERPOOL_ID")

def create_cognito_user(email: str, temp_password: str):
    print("Creating Cognito user with email:", email)
    try:
        response = COGNITO.admin_create_user(
            UserPoolId=USER_POOL_ID,
            Username=email,
            TemporaryPassword=temp_password,
            MessageAction='SUPPRESS',
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'email_verified', 'Value': 'True'}
            ]
        )
        print("Created Cognito user:", response)
        return response
    except ClientError as e:
        raise Exception(f"Failed to create user: {e.response['Error']['Message']}")

def delete_cognito_user(username: str):
    try:
        COGNITO.admin_delete_user(
            UserPoolId=USER_POOL_ID,
            Username=username
        )
    except ClientError as e:
        raise Exception(f"Failed to delete user: {e.response['Error']['Message']}")