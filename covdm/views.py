from django.shortcuts import render, redirect
from .models import Center

def index(request):
    return redirect("home")

def home(request):
    centers = Center.objects.all()
    return render(request, "index/home.html", {"centers":centers})

def map(request):
    return render(request, "index/map.html")

def stats(request):
    return render(request, "index/stats.html")

def about(request):
    return render(request, "index/about.html")

def form(request):
    return render(request, "index/form.html")