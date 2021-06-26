from django.urls import path

from .views import index

urlpatterns = [
    path('version-1/', index)
]
