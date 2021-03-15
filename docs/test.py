from json import load

centers = load(open('output.json'))

"""
id,
adresse,
long/lat,
mod_prel,
public,
horaire,
check_rdv,
tel_rdv,
web_rdv,
acces_restreint
"""
cnt = 0

for key in centers:

    key["id"] = cnt
    del key["id_ej"]
    del key["finess"]
    del key["cpl_loc"]
    cnt += 1

print(cnt)