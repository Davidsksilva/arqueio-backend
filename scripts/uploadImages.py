import os
import requests


refTags = ['sala', 'mesas', 'gourmet', 'lavanderia', 'banheiro', 'cozinha', 'dormitorio',
           'varanda', 'studio', 'cervejaria', 'home', 'quarto', 'lavabo', 'closet', 'corporativo', 'solteiro', 'casal', 'unisex']


def corrigirDormitorio(e):
    if(e == 'dormitrio'):
        return 'dormitorio'
    else:
        return e


def main():

    for filename in os.listdir("../../imagens_italinea/"):

        # response = requests.post(
       #     'http://18.191.111.54:1337/files-italinea', files={'file': open('filename', 'rb')})

        # file_id = response.content.id

        tags = filename.split('-')
        tags = map(corrigirDormitorio, tags)
        tags = list(
            filter(lambda x: (len(x) > 3) and (not '.jpg' in x) and (x in refTags), tags))

        print(tags)
        # dst = filename.split(' ')[0] + '.jpg'
        # src = "../../imagens_italinea/" + filename
        # dst = "../../imagens_italinea/" + dst
        # os.rename(src, dst)


# Driver Code
if __name__ == '__main__':

    # Calling main() function
    main()
