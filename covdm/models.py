from django.db import models

class Center(models.Model):

    name = models.CharField(max_length=100)
    adress = models.CharField(max_length=100)
    region = models.IntegerField(null=True)
    longitude = models.CharField(max_length=20, null=True)
    latitude = models.CharField(max_length=20, null=True)
    sampling = models.CharField(max_length=50)
    public = models.CharField(max_length=250)
    timetable = models.CharField(max_length=250, blank=True)
    # ..app for appointment
    checkapp = models.CharField(max_length=100, blank=True)
    phoneapp = models.IntegerField(blank=True)
    webapp = models.CharField(max_length=250, blank=True)
    restricted = models.BooleanField()

class User(models.Model):

    is_vaccinated = models.BooleanField()
    sick = models.BooleanField()
    dead = models.BooleanField()
    center = models.ForeignKey(Center, on_delete=models.CASCADE)
    vaccination_date = models.CharField(max_length=20, null=True)
    age = models.IntegerField()
    