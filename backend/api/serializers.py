from rest_framework import serializers
from flowers.models import Category, Flower

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class FlowerSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Flower
        fields = [
            'id', 
            'name', 
            'description', 
            'price', 
            'category', 
            'category_name',
            'image', 
            'in_stock', 
            'created_at'
        ]