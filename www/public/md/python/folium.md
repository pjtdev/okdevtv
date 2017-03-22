# folium

* https://folium.readthedocs.io/en/latest/
* `pip install folium`
```
import folium

map_osm = folium.Map(location=[45.5236, -122.6750])
map_osm

stamen = folium.Map(location=[45.5236, -122.6750], zoom_start=13)
stamen

stamen = folium.Map(location=[45.5236, -122.6750], tiles='Stamen Toner', zoom_start=13)
stamen

map_1 = folium.Map(location=[45.372, -121.6972], tiles='Stamen Terrain', zoom_start=12)
folium.Marker([45.3288, -121.6625], popup='Mt. Hood Meadows').add_to(map_1)
map_1
```

## ref: 
* 지리적 정보를 시각화할 때 괜찮은 Python 지도 모듈 Folium
  * http://pinkwink.kr/971
