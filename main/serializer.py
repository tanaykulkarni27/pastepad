import imp
from multiprocessing.spawn import import_main_path
from rest_framework import serializers
from .models import Paste



class PasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paste
        fields = ['title', 'content', 'upload_time', 'upload_date','key']
