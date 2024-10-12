from rest_framework_simplejwt.backends import TokenBackend

class CustomTokenBackend(TokenBackend):
    def encode(self, payload):
        # Override to return the token directly as a string
        return super().encode(payload)
