from django.db import models
from django.contrib.auth.models import User


class Blog(models.Model):

    title = models.CharField(max_length=200)

    image = models.ImageField(upload_to='blogs/')

    short_description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ChildProfile(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    child_name = models.CharField(max_length=100)

    age = models.IntegerField()

    gender = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.child_name


class VaccineRecord(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    vaccine_name = models.CharField(max_length=100)

    date_taken = models.DateField()

    doctor_name = models.CharField(max_length=100)

    def __str__(self):
        return self.vaccine_name


class Drive(models.Model):

    location = models.CharField(max_length=200)

    date = models.DateField()

    doctor_name = models.CharField(max_length=100)

    available_slots = models.IntegerField()

    def __str__(self):
        return self.location


class Booking(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    child = models.ForeignKey(
        ChildProfile,
        on_delete=models.CASCADE
    )

    drive = models.ForeignKey(
        Drive,
        on_delete=models.CASCADE
    )

    booking_date = models.DateField()

    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.username} - {self.child.child_name}"