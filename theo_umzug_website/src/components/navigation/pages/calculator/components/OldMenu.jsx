import React, { useState } from "react";
import Icon from "../../../icon/Icon.jsx";
import { useTranslation } from "react-i18next";
import { DatePicker, Flex, Input, Typography, Select } from "antd";
import "./Calculator.css";
import ApartamentInputSelect from "./components/ApartmentInputSelect.jsx";
import ApartamentInputField from "./components/ApartmentInputField.jsx";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import NumberInput from "./components/NumberInput.jsx";
import InputField from "./components/InputField.jsx";
import FurnitureMenu from "./components/FurnitureMenu.jsx";
const OldMenu = () => {
    return (
        <div>

        <NumberInput title={"Ліжко"} iconName={"bed"} />
              <NumberInput title={"Umzugskartons"} iconName={"box-1"} />
              <NumberInput title={"Taschen mit Kleidung"} iconName={"bag"} />
              <NumberInput title={"Koffer"} iconName={"suitcase-travel"} />
              <NumberInput
                title={"Kleine Dinger, Taschen, Rucksäcke bis 10 kg"}
                iconName={"backpack-bag-holidays"}
              />
              {/* <NumberInput title={"Bett 90×200 cm"} iconName={bedIcon} /> */}
              {/* <NumberInput title={"Bett 140×200 cm"} iconName={bedIcon} />
              <NumberInput title={"Bett 180×200 cm"} iconName={bedIcon} />
              <NumberInput
                title={"Bett/Boxspringbett 90×200 cm"}
                iconName={bedIcon}
              />
              <NumberInput
                title={"Bett/Boxspringbett 140×200 cm"}
                iconName={bedIcon}
              />
              <NumberInput
                title={"Bett/Boxspringbett 180×200 cm"}
                iconName={bedIcon}
              />
              <NumberInput title={"Bett/Kinderbett"} iconName={bedIcon} />
              <NumberInput title={"Bett/Klappbett"} iconName={bedIcon} /> */}
              <NumberInput
                title={"Bild bis zu 1m breit"}
                iconName={"picture"}
              />
              {/* <NumberInput title={"Bild bis zu 2m breit"} iconName={bedIcon} /> */}
              <NumberInput
                title={"Büroausstattung"}
                iconName={"desk-computer"}
              />
              <NumberInput title={"Fahrrad"} iconName={"bicycle-3"} />
              <NumberInput title={"Чахлик"} iconName={"bicycle-3"} />
              <NumberInput title={"Fernseher bis zu 40 Zoll"} iconName={"tv"} />
              {/* <NumberInput
                title={"Fernseher bis zu 60 Zoll"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Gamingstuhl, Bürostuhl"}
                iconName={"armchair-thin"}
              />
              <NumberInput
                title={"Garderobe"}
                iconName={"closet-furniture-and-household"}
              />
              {/* <NumberInput title={"Gartenmöbel Sessel"} iconName={bedIcon} /> */}
              <NumberInput title={"Gartenmöbel Tisch"} iconName={"table"} />
              <NumberInput title={"Geschirrspüler"} iconName={"dishwasher-2"} />
              {/* <NumberInput
                title={"Hochschrank Badezimmer"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Kleiderschrank bis zu 1m breit"}
                iconName={"closet-furniture-and-household"}
              />
              {/* <NumberInput
                title={"Kleiderschrank bis zu 2m breit"}
                iconName={bedIcon}
              />
              <NumberInput
                title={"Kleiderschrank bis zu 3m breit"}
                iconName={bedIcon}
              /> */}
              {/* <NumberInput
                title={"Kleiderschrank/Schwebetürenschrank 2-türig"}
                iconName={bedIcon}
              />
              <NumberInput
                title={"Kleiderschrank/Schwebetürenschrank 3-türig"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Kommode, Sideboard"}
                iconName={"closet-furniture-and-household"}
              />
              {/* <NumberInput title={"Küchenabzug"} iconName={bedIcon} /> */}
              {/* <NumberInput title={"Küchenschrank"} iconName={bedIcon} /> */}
              {/* <NumberInput title={"Küchenwandschränke"} iconName={bedIcon} /> */}
              {/* <NumberInput title={"Kühlschrank 2-türig"} iconName={bedIcon} />
              <NumberInput
                title={"Kühlschrank bis zu 1,2m hoch"}
                iconName={bedIcon}
              /> */}
              <NumberInput title={"Kühlschrank"} iconName={"fridge-2"} />
              <NumberInput title={"Lampe, Deckenlampe"} iconName={"lamp-1"} />
              {/* <NumberInput title={"Lampe, Stehlampe"} iconName={bedIcon} /> */}
              <NumberInput title={"Lattenrost 90×200 cm"} iconName={"bed"} />
              {/* <NumberInput title={"Lattenrost 140×200 cm"} iconName={bedIcon} />
              <NumberInput title={"Lattenrost 180×200 cm"} iconName={bedIcon} />
              <NumberInput title={"Matratz 90×200 cm"} iconName={bedIcon} />
              <NumberInput title={"Matratz 140×200 cm"} iconName={bedIcon} /> */}
              <NumberInput title={"Matratz 180×200 cm"} iconName={"bed"} />
              {/* <NumberInput title={"Medikamentenschrank"} iconName={bedIcon} /> */}
              <NumberInput title={"Mikrowelle"} iconName={"microwave"} />
              {/* <NumberInput title={"Nachttisch"} iconName={bedIcon} /> */}
              <NumberInput title={"Ofen und Herd"} iconName={"oven"} />
              {/* <NumberInput
                title={"Pflanze bis zu 1m hoch"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Pflanze bis zu 2m hoch"}
                iconName={"plant"}
              />
              {/* <NumberInput title={"Platte"} iconName={bedIcon} /> */}
              <NumberInput title={"Regale"} iconName={"book-shelf"} />
              {/* <NumberInput title={"Rollcontainer"} iconName={bedIcon} /> */}
              <NumberInput
                title={"Schlaf-/Gästesofa 90×200 cm"}
                iconName={"sofa"}
              />
              {/* <NumberInput title={"Schreibtisch leichter"} iconName={bedIcon} /> */}
              <NumberInput title={"Schreibtisch schwerer"} iconName={"table"} />
              {/* <NumberInput title={"Schuhschrank"} iconName={bedIcon} /> */}
              <NumberInput title={"Sessel"} iconName={"chair-2"} />
              {/* <NumberInput title={"Sofa aus 1 Teilen"} iconName={bedIcon} />
              <NumberInput
                title={"Sofa, Ecksofa aus 2 Teilen"}
                iconName={bedIcon}
              /> */}
              {/* <NumberInput
                title={"Sofa, Ecksofa aus 3 Teilen"}
                iconName={bedIcon}
              /> */}
              {/* <NumberInput
                title={"Spiegel bis zu 1m breit"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Spiegel bis zu 2m breit"}
                iconName={"mirror"}
              />
              {/* <NumberInput title={"Spiegelschrank"} iconName={bedIcon} /> */}
              <NumberInput title={"Stuhl"} iconName={"chair-2"} />
              {/* <NumberInput
                title={"Teppich bis zu 1m breit"}
                iconName={bedIcon}
              />
              <NumberInput
                title={"Teppich bis zu 2m breit"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Teppich bis zu 3m breit"}
                iconName={"carpet"}
              />
              {/* <NumberInput
                title={"Tisch leichter oder Couchtisch mit Glasplatte"}
                iconName={bedIcon}
              /> */}
              {/* <NumberInput
                title={"Tisch leichter, Couchtisch"}
                iconName={bedIcon}
              /> */}
              {/* <NumberInput title={"Tisch schwerer"} iconName={bedIcon} />
              <NumberInput
                title={"Tisch schwerer mit Glasplatte"}
                iconName={bedIcon}
              /> */}
              <NumberInput
                title={"Trockenmaschine"}
                iconName={"washing-machine-2"}
              />
              {/* <NumberInput
                title={"Waschbeckenunterschrank"}
                iconName={bedIcon}
              /> */}
              {/* <NumberInput title={"Wäschekorb"} iconName={bedIcon} /> */}
              <NumberInput
                title={"Waschmaschine"}
                iconName={"washing-machine-2"}
              />
              {/* <NumberInput title={"Waschmaschinenschrank"} iconName={bedIcon} /> */}
            </div>
    );
}
