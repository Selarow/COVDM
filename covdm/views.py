from django.shortcuts import render, redirect

def index(request):
    return redirect("home")

def home(request):
    return render(request, "index/home.html")

def map(request):
    return render(request, "index/map.html")

def stats(request):
    return render(request, "index/stats.html")

def about(request):
    return render(request, "index/about.html")
