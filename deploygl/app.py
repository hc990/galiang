from smb.SMBConnection import SMBConnection
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
import os
import fitz
import ebooklib
from ebooklib import epub
from PIL import Image
import io
from imghdr import what

def extract_cover(epub_path, cover_path, thumbnail_size=(100, 150)):
    try:
        book = epub.read_epub(epub_path)
#         for item in book.get_items():
#             print(item)
        cover_id = None
        for item in book.get_metadata('OPF', 'meta'):
            if item.get('name') == 'cover':
                cover_id = item.get('content')
                break
        if cover_id:
            cover_image = book.get_item_with_id(cover_id)
        else:
            cover_image = None
   
        if not cover_image:           
            for item in book.get_items():
                if  item.media_type.startswith('image/') :
                    if 'cover' in item.get_name().lower():
                        cover_image = item
                        break    
                    
        if not cover_image:
            for item in book.get_items_of_type(epub.ITEM_IMAGE):
                if 'cover' in item.get_name().lower():
                    cover_image = item
                    break 
                
        cover_content = cover_image.get_content()
        image = Image.open(io.BytesIO(cover_content))
        thumbnail = image.resize(thumbnail_size)
        thumbnail.save(cover_path)
    except:
        print(epub_path+'未生成縮略圖')
        
def generate_thumbnail(pdf_path, thumbnail_path):
    try:
        pdf_document = fitz.open(pdf_path)  # 打开 PDF 文件
        if pdf_document.page_count == 0:
            raise ValueError("PDF 文件没有页面")
        first_page = pdf_document[0]
        rect = first_page.rect  # 页面尺寸
        pixmap = first_page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5))  # 创建缩略图
        pixmap.save(thumbnail_path)  # 保存缩略图
    except Exception as e:
        print(f"生成缩略图失败: {e}")
    pdf_document.close()# Close the PDF document
    

server_name = 'mongodb+srv://huangchong:NVHYEx8HSzYHS6ra@ceair-cluster.wootsqu.mongodb.net'
client = MongoClient(server_name,server_api=ServerApi('1'))
db = client.test

# conn = SMBConnection(userID, password, client_machine_name, server_name, domain=domain_name, use_ntlm_v2=True,
#                      is_direct_tcp=True)
# conn.connect(server_ip, 445)
# shares = conn.listShares()
# db.books.drop()

PATH=r'/app/data'

i=1;
for filename in os.listdir(PATH):
#     if not share.isSpecial and share.name == 'library':
#         sharedfiles = conn.listPath(share.name, '/books')
#       print(dirname)
#       for filename in filenames:
        if 'pdf' in filename or 'epub' in filename: 
            name,extend = filename.rsplit(".", 1) 
            oribookname = filename
            bookname = filename
            bookname = bookname.translate({ord('['): None})
            bookname = bookname.translate({ord(']'): None})
            bookname = bookname.replace('.扫描版','')
            bookname = bookname.replace(' (Z-Library)','')
            bookname = bookname.replace('&amp;','.')
            if '.' in bookname:
                name,extend = bookname.rsplit(".", 1) 
                file_stat = os.stat(os.path.join(PATH, filename))
                book = db.books.insert_one({'serial': i,'oribookname':oribookname,'bookname':bookname,\
                                     'name':name.lower(),'extend':extend.lower(), \
                                 'createAt': datetime.fromtimestamp(file_stat.st_ctime)  ,\
                                    'comment':"", 'status':0,'size': file_stat.st_size/1024/1024})
               
            i=i+1;
            file_path = os.path.join(PATH, filename)
            thumbnail_path = '/app/data/thumbnail/'+str(book.inserted_id)+'.png'
            if('pdf' in filename):
                try:
                    generate_thumbnail(file_path, thumbnail_path)
                except Exception as e:
                    print(f"处理文件 {file_path} 时出错: {e}")
            if('epub' in filename):
                extract_cover(file_path, thumbnail_path)
            print(bookname)
# conn.close()
