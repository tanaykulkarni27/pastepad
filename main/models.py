from statistics import mode
from xml.etree.ElementInclude import default_loader
from django.db import models
from django.conf import settings

class Paste(models.Model):
    title = models.TextField(default = 'title')
    content = models.TextField(default = 'content')
    upload_time =  models.TimeField(auto_now_add= True)
    upload_date =  models.DateField(auto_now_add= True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    key = models.TextField(default = '')
    