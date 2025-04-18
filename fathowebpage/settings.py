import os
from pathlib import Path
import environ
import dj_database_url

# Inicializa o django-environ
env = environ.Env(
    DEBUG=(bool, False)
)

BASE_DIR = Path(__file__).resolve().parent.parent

# Configurações sensíveis via variáveis de ambiente
SECRET_KEY = os.environ.get('SECRET_KEY', 'sua-chave-secreta-padrao')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# Configuração explícita de ALLOWED_HOSTS para produção
ALLOWED_HOSTS = [
    'fathojf.onrender.com',  # Seu domínio no Render
    'localhost',
    '127.0.0.1'
]

# Se em desenvolvimento, adiciona hosts extras
if DEBUG:
    ALLOWED_HOSTS.extend(['*'])

# Aplicativos instalados
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',  # Deve vir antes de staticfiles
    'django.contrib.staticfiles',
    'core',
    'crispy_forms',
    'services',
    'testimonials',
    'django_ckeditor_5',
]

# Configurações de segurança para produção
if not DEBUG:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_HSTS_SECONDS = 31536000  # 1 ano
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'

# Configurações do CKEditor
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': [
            'heading', '|', 'bold', 'italic', 'link', 
            'bulletedList', 'numberedList', 'blockQuote',
        ],
        'heading': {
            'options': [
                {'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph'},
                {'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1'},
                {'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2'}
            ]
        },
        'htmlSupport': {
            'allow': [
                {'name': 'span', 'classes': ['text-black']},  # Permitir classe text-black
            ]
        },
        'htmlEmbed': {
            'showPreviews': True
        },
    },
    'extends': {
        'blockToolbar': [
            'paragraph', 'heading1', 'heading2', '|',
            'bulletedList', 'numberedList', '|',
            'blockQuote',
        ],
        'toolbar': [
            'heading', '|', 'bold', 'italic', 'link', '|',
            'bulletedList', 'numberedList', 'blockQuote', '|',
        ],
        'ui': {
            'viewportOffset': { 'top': 50 }  # Ajuste de espaçamento
        },
        'language': 'pt-br',
        'style': {
            'definitions': [
                {
                    'name': 'Black Text',
                    'element': 'span',
                    'classes': ['text-black'],
                    'styles': {
                        'color': '#000000 !important',  # Forçar cor preta
                    }
                }
            ],
            'default': 'Black Text'  # Aplicar estilo por padrão
        }
    }
}

# Configurações de templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Configuração de URLs
ROOT_URLCONF = 'fathowebpage.urls'
WSGI_APPLICATION = 'fathowebpage.wsgi.application'

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Banco de dados
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}

# Validação de senha
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Arquivos estáticos
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Arquivos de mídia
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Configurações internacionais
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# Configurações extras
CRISPY_TEMPLATE_PACK = 'bootstrap4'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'