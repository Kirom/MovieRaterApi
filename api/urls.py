from django.urls import path, include
from rest_framework import routers

from api.views import RatingViewSet, MovieViewSet

router = routers.DefaultRouter()
router.register('movies', MovieViewSet)
router.register('ratings', RatingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]