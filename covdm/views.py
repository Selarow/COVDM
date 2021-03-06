from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Center, User

def index(request):
    return redirect("map")

def getCenters(request):

    centers = Center.objects.all().values()
    return JsonResponse({"centers": list(centers)})

def getUsers(request):

    users = User.objects.all().values()
    return JsonResponse({"centers": list(users)})

def getDatas(request):

    users = User.objects.all().values()
    centers = Center.objects.all().values()
    return JsonResponse({"centers": list(centers), "users": list(users)})

def map(request):
    return render(request, "index/map.html")

def stats(request):
    return render(request, "index/stats.html")

def form(request):
    return render(request, "index/form.html")