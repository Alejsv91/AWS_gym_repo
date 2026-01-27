import boto3
from botocore.exceptions import ClientError
from models.cognito_user import CognitoUser
import os


COGNITO = boto3.client('cognito-idp', region_name=os.getenv("COGNITO_REGION"))
USER_POOL_ID = os.getenv("USERPOOL_ID")

def create_cognito_user(role_id: int, email: str, temp_password: str):
    print("Creating Cognito user with email:", email)
    try:
        response = COGNITO.admin_create_user(
            UserPoolId=USER_POOL_ID,
            Username=email,
            TemporaryPassword=temp_password,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'email_verified', 'Value': 'True'},
                {'Name': 'custom:role_id', 'Value': str(role_id)}
            ],
            DesiredDeliveryMediums=['EMAIL']
        )
        print("Created Cognito user:", response)
        return CognitoUser(
            username=response['User']['Username'],
            status=response['User']['UserStatus'],
            email=email
        )
    except ClientError as e:
        print ("Error creating Cognito user:", e)
        raise Exception(f"Failed to create user: {e.response['Error']['Message']}")

def delete_cognito_user(username: str):
    try:
        print("-------------/nStarting process to delete Cognito user with username:", username)
        COGNITO.admin_delete_user(
            UserPoolId=USER_POOL_ID,
            Username=username
        )
        print(f"Deleted Cognito user with username:{username} Completed/n-------------")
        return True
    except ClientError as e:
        raise Exception(f"Failed to delete user: {e.response['Error']['Message']}")