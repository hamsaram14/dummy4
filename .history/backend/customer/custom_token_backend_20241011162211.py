from rest_framework_simplejwt.backends import TokenBackend

class CustomTokenBackend(TokenBackend):
    def __init__(self, algorithm='HS256', signing_key=None, verifying_key=None, audience=None, issuer=None, leeway=0):
        super().__init__(algorithm=algorithm, signing_key=signing_key, verifying_key=verifying_key, audience=audience, issuer=issuer, leeway=leeway)

    def encode(self, payload):
        token = super().encode(payload)
        if isinstance(token, bytes):
            return token.decode('utf-8')
        return token
