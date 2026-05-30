from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .models import (
    Blog,
    ChildProfile,
    VaccineRecord,
    Booking
)

def loading(request):

    return render(request, 'loading.html')

@login_required(login_url='login')
def index(request):

    return render(request, 'index.html')


@login_required(login_url='login')
def blog(request):

    blogs = Blog.objects.all()

    return render(request, 'blog.html', {
        'blogs': blogs
    })


@login_required(login_url='login')
def diet(request):

    return render(request, 'diet.html')


@login_required(login_url='login')
def drive(request):

    return render(request, 'drive.html')


@login_required(login_url='login')
def partner(request):

    return render(request, 'partner.html')


@login_required(login_url='login')
def safetyfaq(request):

    return render(request, 'safetyfaq.html')


@login_required(login_url='login')
def vaccine(request):

    return render(request, 'vaccine.html')


@login_required(login_url='login')
def virtual(request):

    return render(request, 'virtual.html')


def login_view(request):

    if request.user.is_authenticated:

        return redirect('index')

    if request.method == 'POST':

        username = request.POST.get('username')

        password = request.POST.get('password')

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:

            login(request, user)

            return redirect('index')

        else:

            return render(request, 'login.html', {
                'error': 'Invalid username or password'
            })

    return render(request, 'login.html')


def signup(request):

    if request.method == "POST":

        username = request.POST.get('username')

        email = request.POST.get('email')

        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():

            return render(request, 'signup.html', {
                'error': 'Username already exists'
            })

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user.save()

        return redirect('login')

    return render(request, 'signup.html')


def logout_view(request):

    logout(request)

    return redirect('login')


@login_required(login_url='login')
def profile(request):

    children = ChildProfile.objects.filter(
        user=request.user
    )

    vaccines = VaccineRecord.objects.filter(
        user=request.user
    )

    bookings = Booking.objects.filter(
        user=request.user
    )

    context = {

        'children': children,

        'vaccines': vaccines,

        'bookings': bookings,

        'total_children': children.count(),

        'total_vaccines': vaccines.count(),

        'total_bookings': bookings.count(),

    }

    return render(
        request,
        'profile.html',
        context
    )