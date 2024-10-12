from rest_framework_simplejwt.backends import TokenBackend

class CustomTokenBackend(TokenBackend):
    def __init__(self, algorithm='HS256', signing_key=None, verifying_key=None, audience=None, issuer=None):
        super().__init__(algorithm=algorithm, signing_key=signing_key, verifying_key=verifying_key, audience=audience, issuer=issuer)
