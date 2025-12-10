import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from flowers.models import Category, Flower

print("Очищаем старые данные...")
Flower.objects.all().delete()
Category.objects.all().delete()

# Создаем категории
categories = [
    {'name': 'Розы', 'slug': 'rozy'},
    {'name': 'Тюльпаны', 'slug': 'tyulpany'},
    {'name': 'Орхидеи', 'slug': 'orkhidei'},
    {'name': 'Букеты', 'slug': 'bukety'},
]

print("Создаем категории...")
for cat_data in categories:
    cat, created = Category.objects.get_or_create(**cat_data)
    print(f"  {'Создана' if created else 'Уже есть'}: {cat.name}")

# Получаем категории
roses = Category.objects.get(name='Розы')
tulips = Category.objects.get(name='Тюльпаны')
orchids = Category.objects.get(name='Орхидеи')
bouquets = Category.objects.get(name='Букеты')

# Создаем товары
flowers = [
    {
        'name': 'Красные розы (25 шт)',
        'description': 'Прекрасные красные розы для особых случаев. Длина стебля 50-60 см.',
        'price': 2500,
        'category': roses,
        'in_stock': True,
    },
    {
        'name': 'Белые тюльпаны',
        'description': 'Нежные белые тюльпаны весеннего настроения. Свежий срез.',
        'price': 1200,
        'category': tulips,
        'in_stock': True,
    },
    {
        'name': 'Орхидея Фаленопсис',
        'description': 'Элегантная орхидея в керамическом горшке. Цветение 3-4 месяца.',
        'price': 1800,
        'category': orchids,
        'in_stock': True,
    },
    {
        'name': 'Свадебный букет',
        'description': 'Изысканный букет для невесты: розы, пионы, эвкалипт.',
        'price': 3500,
        'category': bouquets,
        'in_stock': True,
    },
    {
        'name': 'Розовые розы',
        'description': 'Нежные розовые розы в подарочной упаковке.',
        'price': 2000,
        'category': roses,
        'in_stock': True,
    },
    {
        'name': 'Смешанный букет',
        'description': 'Яркий букет из разных цветов для любого праздника.',
        'price': 2800,
        'category': bouquets,
        'in_stock': False,  # Нет в наличии
    },
]

print("\nСоздаем товары...")
for i, flower_data in enumerate(flowers, 1):
    flower, created = Flower.objects.get_or_create(**flower_data)
    status = "✅ Создан" if created else "⚠️ Уже есть"
    print(f"  {i}. {status}: {flower.name} - {flower.price} руб.")

print(f"\n{'='*50}")
print("✅ Тестовые данные созданы!")
print(f"   Категорий: {Category.objects.count()}")
print(f"   Товаров: {Flower.objects.count()}")
print(f"{'='*50}")