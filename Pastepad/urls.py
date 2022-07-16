"""Pastepad URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from main.views import PasteRUD,PasteAPIView,home,Flogout,Flogin,Fcreate,create_post,POST,get_token

urlpatterns = [
    path('token',get_token),
    path('login',Flogin),
    path('logout',Flogout),
    path('',home),
    path('CreatePost',create_post),
    path('admin/', admin.site.urls),
    path('api/<str:id>',PasteRUD.as_view()),
    path('api',PasteAPIView.as_view()),
    path('createuser',Fcreate),
    path('read/<str:key>',POST),
]