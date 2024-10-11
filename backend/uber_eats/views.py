from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the UberEats API! Please navigate to /api/customer/, /api/restaurant/, etc.")