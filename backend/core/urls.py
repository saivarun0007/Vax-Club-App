from django.urls import path
from . import views

urlpatterns = [

   path('', views.loading, name='loading'),

    path('home/', views.index, name='index'),

    path('blog/', views.blog, name='blog'),

    path('diet/', views.diet, name='diet'),

    path('drive/', views.drive, name='drive'),

    path('partner/', views.partner, name='partner'),

    path('safetyfaq/', views.safetyfaq, name='safetyfaq'),

    path('profile/', views.profile, name='profile'),

    path('vaccine/', views.vaccine, name='vaccine'),

    path('virtual/', views.virtual, name='virtual'),

    path('login/', views.login_view, name='login'),

    path('signup/', views.signup, name='signup'),

    path('logout/', views.logout_view, name='logout'),

]