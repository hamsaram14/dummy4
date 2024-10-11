from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Customer

class CustomerTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse('customer_signup')
        self.login_url = reverse('customer_login')

    def test_customer_signup(self):
        data = {
            'email': 'test@example.com',
            'password': 'Test1234!',
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_number': '1234567890'
        }
        response = self.client.post(self.signup_url, data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_customer_login(self):
        # First sign up a customer
        signup_data = {
            'email': 'test@example.com',
            'password': 'Test1234!',
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_number': '1234567890'
        }
        self.client.post(self.signup_url, signup_data, format='json')

        # Now log in with correct credentials
        login_data = {'email': 'test@example.com', 'password': 'Test1234!'}
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, 200)