from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .schedule.agenda import start, holamundo
# Create your views here.

from apscheduler.schedulers.asyncio import AsyncIOScheduler
scheduler = AsyncIOScheduler()


@api_view(["POST"])
def index(request):
    holamundo()
    return Response({"Nice":"0"})


