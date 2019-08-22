import os
import requests


print(response.content)


def main():

    for filename in os.listdir("../../imagens_italinea/"):

        response = requests.post(
            'http://httpbin.org/post', files={'file': open('filename', 'rb')})

        dst = filename.split(' ')[0] + '.jpg'
        src = "../../imagens_italinea/" + filename
        dst = "../../imagens_italinea/" + dst
        os.rename(src, dst)


# Driver Code
if __name__ == '__main__':

    # Calling main() function
    main()
