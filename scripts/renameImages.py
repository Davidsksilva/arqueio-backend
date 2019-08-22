# Pythono3 code to rename multiple
# files in a directory or folder

# importing os module
import os

# Function to rename multiple files


def main():

    for filename in os.listdir("../../imagens_italinea/"):
        dst = filename.split(' ')[0] + '.jpg'
        src = "../../imagens_italinea/" + filename
        dst = "../../imagens_italinea/" + dst
        os.rename(src, dst)


# Driver Code
if __name__ == '__main__':

    # Calling main() function
    main()
