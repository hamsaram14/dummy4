from rest_framework_simplejwt.backends import TokenBackend

class CustomTokenBackend(TokenBackend):
    def encode(self, payload):
        token = super().encode(payload)
        if isinstance(token, bytes):
            return token.decode('utf-8')
        return token
