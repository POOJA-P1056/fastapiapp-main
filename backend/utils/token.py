from datetime import datetime, timedelta, timezone
from jose import jwt
from schemas.tokens import Token


def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key="secret", algorithm="HS256")
    return encoded_jwt