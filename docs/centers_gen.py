
# IMPORTS
from json import load

# Lecture du json
centers = load(open('output2.json'))

# Création d'un fichier texte pour y stocker le script
fichier = open("centers_gen2.txt", "a")

# Ecriture de l'entête de la formule SQL
fichier.write("INSERT INTO covdm_center (id, name, adress, region, longitude, latitude, sampling, public, timetable, checkapp, phoneapp, webapp, restricted)"+"\n")
fichier.write("VALUES"+"\n")

# Initialisation d'un compteur de centres
cnt = 1

# Parcours et Traitement du fichier JSON (des centres)
for center in centers:

    # Réecriture de l'id
    center["id"] = cnt
    cnt += 1

    # Mise en place des paramétres dans une liste
    datas = [
        center['id'],
        center['rs'],
        center['adresse'],
        center['region'],
        center['longitude'],
        center['latitude'],
        center['mod_prel'],
        center['public'],
        center['horaire'],
        center['check_rdv'],
        center['tel_rdv'],
        center['web_rdv'],
        center['acces_restreint'],
    ]
    # Liste pour gérer les champs String
    isString = [
        False,
        True,
        True,
        False,
        True,
        True,
        True,
        True,
        True,
        True,
        True,
        True,
        False
        ]

    line = "\t("

    for i in range(len(datas)):

        if isString[i] :
            if datas[i] == None :
                line += "NULL,"
            else : 
                line += f"\"{str(datas[i])}\","
        else :
            if i != len(datas)-1 :
                if datas[i] == None:
                    line += "NULL,"
                else :
                    line += f"{datas[i]},"
            else :
                line += f"{datas[i]}),\n"

    #print(line)
    fichier.write(line)
fichier.close()

print("SCRIPT DONE !")