import os
import requests
import json

refTags = ['sala', 'mesas', 'gourmet', 'lavanderia', 'banheiro', 'cozinha', 'dormitorio',
           'varanda', 'studio', 'cervejaria', 'home', 'quarto', 'lavabo', 'closet', 'corporativo', 'solteiro', 'casal', 'unisex']


def corrigirDormitorio(e):
    if(e == 'dormitrio'):
        return 'dormitorio'
    else:
        return e


def main():

    for filename in os.listdir("../../imagens_italinea/"):
        path = "../../imagens_italinea/" + filename
        response = requests.post(
            'http://18.191.111.54:1337/files-italinea', files={'file': open(path, 'rb')})
        file_id = response.json()['id']
        tags = filename.split('-')
        tags = map(corrigirDormitorio, tags)
        tags = list(
            filter(lambda x: (len(x) > 3) and (not '.jpg' in x) and (x in refTags), tags))

        payload = {'tags': tags,
                   'title': 'Imagem da Italinea Torre', 'image_id': file_id, 'description': 'Imagem'}
        print(payload)
        response = requests.post(
            'http://18.191.111.54:1337/posts', data=payload)

        print(response)


# Driver Code
if __name__ == '__main__':

    # Calling main() function
    main()
