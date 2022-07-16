from django.http import HttpResponse
from rest_framework import generics
from django.contrib.auth import authenticate, login,logout
from .models import Paste
from .serializer import PasteSerializer
import random
from django.contrib.auth.models import User
from django.shortcuts import render,redirect
from django.db.models import Q

def Http404(txt):
    res = HttpResponse(txt)
    res.status_code = 404
    return res
class PasteAPIView(generics.ListAPIView): # retrieve rows , create row
    queryset = Paste.objects.all()
    serializer_class = PasteSerializer

    def get_queryset(self):
        user_obj = self.request.user
        if user_obj.is_authenticated:
            als = Paste.objects.all().filter(Q(user = user_obj))
            if self.request.GET.get('q'):
                als = als.filter(Q(title__icontains = self.request.GET.get('q')) | Q(content__icontains = self.request.GET.get('q'))).distinct()
            return als
        return Http404('ERROR IN FINDING USER')
    def post(self,req,*args,**kwargs):
        if Paste.objects.filter(user = req.user,title__iexact = req.POST.get('title')).exists():
            return Http404("Title should be unique")
        if req.POST.get('content') == '':
            return Http404("cannot save empty content")
        if req.POST.get('title') == '':
            return Http404("cannot save content without title")
        key = str(req.user.id)
        for i in range(16):
            key += chr(ord(random.choice(['a','A'])) + random.randint(0,25))
        Paste(user = req.user,title = req.POST.get('title'),content = req.POST.get('content'),key = key).save()
        return HttpResponse("Content Saved")

class PasteRUD(generics.RetrieveUpdateDestroyAPIView): # retrieve update delete row operations 
    lookup_field = 'id'
    queryset = Paste.objects.all()
    serializer_class = PasteSerializer

    def get_queryset(self):
        return Paste.objects.all()


def home(req):
    return render(req,'index.html')

def Flogout(req):
    logout(req)
    return redirect('/')

def Flogin(req):
    if req.method == "POST":
        email = req.POST.get('email')
        pwd = req.POST.get('password')
        acc = User.objects.filter(email = email)
        if not acc.exists():
            return HttpResponse("INVALID CREDENTIALS")
        acc = authenticate(username = acc[0].username,password =pwd)
        if acc is None:
            return HttpResponse("INVALID CREDENTIALS")
        login(req,acc)
        return HttpResponse("SUCCESS")
    assert False,"GET METHOD NOT SUPPORTED"
def Fcreate(req):
    if req.method == "POST":
        user_name = req.POST.get('username')
        email = req.POST.get('email')
        password = req.POST.get('password')
        als = User.objects.filter(email = email)
        if als.exists() :
            return  HttpResponse("EMAIL ALREADY FOUND")
        als = User.objects.filter(username = user_name)
        if als.exists():
            return  HttpResponse("USERNAME ALREADY FOUND")
        x = User(email=email,username = user_name)
        x.set_password(password)
        x.save()
        login(req,x, backend='django.contrib.auth.backends.ModelBackend')
        return HttpResponse("SUCCESS")
    assert False,"GET METHOD NOT SUPPORTED"

def create_post(req):
    if not req.user.is_authenticated:
        return redirect('/')
    return render(req,'create_paste.html')

def POST(req,key):
    obj = Paste.objects.filter(key = key)
    if obj.exists():
        obj = obj[0]
        context = dict()
        if req.user == obj.user:
            context['editable'] = True;
        context['title'] = obj.title
        context['content'] = obj.content
        context['id'] = obj.id
        return render(req,'view.html',context)
    return Http404("PLEASE CHECK THE LINK")
def get_token(req):
    return HttpResponse('{"token":"' + req.COOKIES.get('csrftoken')+'"}',content_type="text/json")