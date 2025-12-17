from django.contrib import admin
from .models import Category, Flower

admin.site.site_header = "FlowerShop Admin"
admin.site.site_title = "Админка магазина цветов"
admin.site.index_title = "Панель управления"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Flower)
class FlowerAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'in_stock', 'created_at')
    list_filter = ('category', 'in_stock', 'created_at')
    search_fields = ('name', 'description')