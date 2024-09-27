import { inject, Injectable } from "@angular/core";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { from } from "rxjs";
import { IDdi, IRegister } from "../_models/interface/share-interfaces";
import { DialogService } from "../_share/pop-up/dialog.service";
import { ErrorSnackBarService } from "../_share/pop-up/error-pop-up/error-snack-bar.service";

const fireBaseddiData: IDdi[] = [
  { "codigo": "004", "fone": "0093", "iso": "AF", "iso3": "AFG", "nome": "Afeganistão", "nomeFormal": "República Islâmica do Afeganistão" },
  { "codigo": "008", "fone": "0355", "iso": "AL", "iso3": "ALB", "nome": "Albânia", "nomeFormal": "República da Albânia" },
  { "codigo": "012", "fone": "0213", "iso": "DZ", "iso3": "DZA", "nome": "Algéria", "nomeFormal": "República Democrática Popular da Algéria" },
  { "codigo": "016", "fone": "1684", "iso": "AS", "iso3": "ASM", "nome": "Samoa Americana", "nomeFormal": "Território de Samoa Americana" },
  { "codigo": "020", "fone": "0376", "iso": "AD", "iso3": "AND", "nome": "Andorra", "nomeFormal": "Principado Andorra" },
  { "codigo": "024", "fone": "0244", "iso": "AO", "iso3": "AGO", "nome": "Angola", "nomeFormal": "República de Angola" },
  { "codigo": "660", "fone": "1264", "iso": "AI", "iso3": "AIA", "nome": "Anguilla", "nomeFormal": "Anguilla" },
  { "codigo": "010", "fone": "0672", "iso": "AQ", "iso3": "ATA", "nome": "Antártida", "nomeFormal": "Antártida" },
  { "codigo": "028", "fone": "1268", "iso": "AG", "iso3": "ATG", "nome": "Antigua e Barbuda", "nomeFormal": "Antigua e Barbuda" },
  { "codigo": "032", "fone": "0054", "iso": "AR", "iso3": "ARG", "nome": "Argentina", "nomeFormal": "República Argentina" },
  { "codigo": "051", "fone": "0374", "iso": "AM", "iso3": "ARM", "nome": "Armênia", "nomeFormal": "República da Armênia" },
  { "codigo": "533", "fone": "0297", "iso": "AW", "iso3": "ABW", "nome": "Aruba", "nomeFormal": "Aruba" },
  { "codigo": "036", "fone": "0061", "iso": "AU", "iso3": "AUS", "nome": "Austrália", "nomeFormal": "Comunidade da Austrália" },
  { "codigo": "040", "fone": "0043", "iso": "AT", "iso3": "AUT", "nome": "Áustria", "nomeFormal": "República da Áustria" },
  { "codigo": "031", "fone": "0994", "iso": "AZ", "iso3": "AZE", "nome": "Azerbaijão", "nomeFormal": "República do Azerbaijão" },
  { "codigo": "044", "fone": "1242", "iso": "BS", "iso3": "BHS", "nome": "Bahamas", "nomeFormal": "Comunidade de Bahamas" },
  { "codigo": "048", "fone": "0973", "iso": "BH", "iso3": "BHR", "nome": "Bahrein", "nomeFormal": "Reino do Bahrein" },
  { "codigo": "050", "fone": "0880", "iso": "BD", "iso3": "BGD", "nome": "Bangladesh", "nomeFormal": "República Popular de Bangladesh" },
  { "codigo": "052", "fone": "0246", "iso": "BB", "iso3": "BRB", "nome": "Barbados", "nomeFormal": "Barbados" },
  { "codigo": "112", "fone": "0375", "iso": "BY", "iso3": "BLR", "nome": "Bielorrússia", "nomeFormal": "República da Bielorrússia" },
  { "codigo": "056", "fone": "0032", "iso": "BE", "iso3": "BEL", "nome": "Bélgica", "nomeFormal": "Reino da Bélgica" },
  { "codigo": "084", "fone": "0501", "iso": "BZ", "iso3": "BLZ", "nome": "Belize", "nomeFormal": "Belize" },
  { "codigo": "204", "fone": "0229", "iso": "BJ", "iso3": "BEN", "nome": "Benin", "nomeFormal": "República do Benin" },
  { "codigo": "060", "fone": "1441", "iso": "BM", "iso3": "BMU", "nome": "Bermuda", "nomeFormal": "Bermuda" },
  { "codigo": "064", "fone": "0975", "iso": "BT", "iso3": "BTN", "nome": "Butão", "nomeFormal": "Reino do Butão" },
  { "codigo": "068", "fone": "0591", "iso": "BO", "iso3": "BOL", "nome": "Bolívia", "nomeFormal": "Estado Plurinacional da Bolívia" },
  { "codigo": "070", "fone": "0387", "iso": "BA", "iso3": "BIH", "nome": "Bósnia e Herzegovina", "nomeFormal": "Bósnia e Herzegovina" },
  { "codigo": "072", "fone": "0267", "iso": "BW", "iso3": "BWA", "nome": "Botswana", "nomeFormal": "República da Botswana" },
  { "codigo": "074", "fone": "0047", "iso": "BV", "iso3": "BVT", "nome": "Ilha Bouvet", "nomeFormal": "Ilha Bouvet" },
  { "codigo": "076", "fone": "0055", "iso": "BR", "iso3": "BRA", "nome": "Brasil", "nomeFormal": "República Federativa do Brasil" },
  { "codigo": "086", "fone": "0246", "iso": "IO", "iso3": "IOT", "nome": "Território Britânico do Oceano Índico", "nomeFormal": "Território Britânico do Oceano Índico" },
  { "codigo": "096", "fone": "0673", "iso": "BN", "iso3": "BRN", "nome": "Brunei", "nomeFormal": "Estado do Brunei Darussalam" },
  { "codigo": "100", "fone": "0359", "iso": "BG", "iso3": "BGR", "nome": "Bulgária", "nomeFormal": "República da Bulgária" },
  { "codigo": "854", "fone": "0226", "iso": "BF", "iso3": "BFA", "nome": "Burkina Faso", "nomeFormal": "Burkina Faso" },
  { "codigo": "108", "fone": "0257", "iso": "BI", "iso3": "BDI", "nome": "Burundi", "nomeFormal": "República do Burundi" },
  { "codigo": "116", "fone": "0855", "iso": "KH", "iso3": "KHM", "nome": "Camboja", "nomeFormal": "Reino do Camboja" },
  { "codigo": "120", "fone": "0237", "iso": "CM", "iso3": "CMR", "nome": "Camarões", "nomeFormal": "República de Camarões" },
  { "codigo": "124", "fone": "0001", "iso": "CA", "iso3": "CAN", "nome": "Canadá", "nomeFormal": "Canadá" },
  { "codigo": "132", "fone": "0238", "iso": "CV", "iso3": "CPV", "nome": "Cabo Verde", "nomeFormal": "República do Cabo Verde" },
  { "codigo": "136", "fone": "1345", "iso": "KY", "iso3": "CYM", "nome": "Ilhas Cayman", "nomeFormal": "Ilhas Cayman" },
  { "codigo": "140", "fone": "0236", "iso": "CF", "iso3": "CAF", "nome": "República Centro-Africana", "nomeFormal": "República Centro-Africana" },
  { "codigo": "148", "fone": "0235", "iso": "TD", "iso3": "TCD", "nome": "Chade", "nomeFormal": "República do Chade" },
  { "codigo": "152", "fone": "0056", "iso": "CL", "iso3": "CHL", "nome": "Chile", "nomeFormal": "República do Chile" },
  { "codigo": "156", "fone": "0086", "iso": "CN", "iso3": "CHN", "nome": "China", "nomeFormal": "República Popular da China" },
  { "codigo": "162", "fone": "0061", "iso": "CX", "iso3": "CXR", "nome": "Ilha Christmas", "nomeFormal": "Território da Ilha Christmas" },
  { "codigo": "166", "fone": "0672", "iso": "CC", "iso3": "CCK", "nome": "Ilhas Cocos (Keeling)", "nomeFormal": "Território das Ilhas Cocos (Keeling)" },
  { "codigo": "170", "fone": "0057", "iso": "CO", "iso3": "COL", "nome": "Colômbia", "nomeFormal": "República da Colômbia" },
  { "codigo": "174", "fone": "0269", "iso": "KM", "iso3": "COM", "nome": "Comores", "nomeFormal": "União das Comores" },
  { "codigo": "178", "fone": "0242", "iso": "CG", "iso3": "COG", "nome": "Congo", "nomeFormal": "República do Congo" },
  { "codigo": "180", "fone": "0242", "iso": "CD", "iso3": "COD", "nome": "Congo (DR)", "nomeFormal": "República Democrática do Congo" },
  { "codigo": "184", "fone": "0682", "iso": "CK", "iso3": "COK", "nome": "Ilhas Cook", "nomeFormal": "Ilhas Cook" },
  { "codigo": "188", "fone": "0506", "iso": "CR", "iso3": "CRI", "nome": "Costa Rica", "nomeFormal": "República da Costa Rica" },
  { "codigo": "384", "fone": "0225", "iso": "CI", "iso3": "CIV", "nome": "Costa do Marfim", "nomeFormal": "República da Costa do Marfim" },
  { "codigo": "191", "fone": "0385", "iso": "HR", "iso3": "HRV", "nome": "Croácia", "nomeFormal": "República da Croácia" },
  { "codigo": "192", "fone": "0053", "iso": "CU", "iso3": "CUB", "nome": "Cuba", "nomeFormal": "República de Cuba" },
  { "codigo": "196", "fone": "0357", "iso": "CY", "iso3": "CYP", "nome": "Chipre", "nomeFormal": "República do Chipre" },
  { "codigo": "203", "fone": "0420", "iso": "CZ", "iso3": "CZE", "nome": "República Tcheca", "nomeFormal": "República Tcheca" },
  { "codigo": "208", "fone": "0045", "iso": "DK", "iso3": "DNK", "nome": "Dinamarca", "nomeFormal": "Reino da Dinamarca" },
  { "codigo": "262", "fone": "0253", "iso": "DJ", "iso3": "DJI", "nome": "Djibuti", "nomeFormal": "República do Djibuti" },
  { "codigo": "212", "fone": "1767", "iso": "DM", "iso3": "DMA", "nome": "Dominica", "nomeFormal": "Comunidade da Dominica" },
  { "codigo": "214", "fone": "1809", "iso": "DO", "iso3": "DOM", "nome": "República Dominicana", "nomeFormal": "República Dominicana" },
  { "codigo": "218", "fone": "0593", "iso": "EC", "iso3": "ECU", "nome": "Equador", "nomeFormal": "República do Equador" },
  { "codigo": "818", "fone": "0020", "iso": "EG", "iso3": "EGY", "nome": "Egito", "nomeFormal": "República Árabe do Egito" },
  { "codigo": "222", "fone": "0503", "iso": "SV", "iso3": "SLV", "nome": "El Salvador", "nomeFormal": "República El Salvador" },
  { "codigo": "226", "fone": "0240", "iso": "GQ", "iso3": "GNQ", "nome": "Guiné Equatorial", "nomeFormal": "República do Guiné Equatorial" },
  { "codigo": "232", "fone": "0291", "iso": "ER", "iso3": "ERI", "nome": "Eritreia", "nomeFormal": "Estado da Eritreia" },
  { "codigo": "233", "fone": "0372", "iso": "EE", "iso3": "EST", "nome": "Estônia", "nomeFormal": "República da Estônia" },
  { "codigo": "231", "fone": "0251", "iso": "ET", "iso3": "ETH", "nome": "Etiópia", "nomeFormal": "República Democrática Federal da Etiópia" },
  { "codigo": "238", "fone": "0500", "iso": "FK", "iso3": "FLK", "nome": "Ilhas Malvinas", "nomeFormal": "Ilhas Malvinas" },
  { "codigo": "234", "fone": "0298", "iso": "FO", "iso3": "FRO", "nome": "Ilhas Faroe", "nomeFormal": "Ilhas Faroe" },
  { "codigo": "242", "fone": "0679", "iso": "FJ", "iso3": "FJI", "nome": "Fiji", "nomeFormal": "República do Fiji" },
  { "codigo": "246", "fone": "0358", "iso": "FI", "iso3": "FIN", "nome": "Finlândia", "nomeFormal": "República da Finlândia" },
  { "codigo": "250", "fone": "0033", "iso": "FR", "iso3": "FRA", "nome": "França", "nomeFormal": "República Francesa" },
  { "codigo": "254", "fone": "0594", "iso": "GF", "iso3": "GUF", "nome": "Guiana Francesa", "nomeFormal": "Guiana Francesa" },
  { "codigo": "258", "fone": "0689", "iso": "PF", "iso3": "PYF", "nome": "Polinésia Francesa", "nomeFormal": "Polinésia Francesa" },
  { "codigo": "260", "fone": "0033", "iso": "TF", "iso3": "ATF", "nome": "Terras Austrais e Antárticas Francesas", "nomeFormal": "Território das Terras Austrais e Antárticas Francesas" },
  { "codigo": "266", "fone": "0241", "iso": "GA", "iso3": "GAB", "nome": "Gabão", "nomeFormal": "República Gabonesa" },
  { "codigo": "270", "fone": "0220", "iso": "GM", "iso3": "GMB", "nome": "Gâmbia", "nomeFormal": "República da Gâmbia" },
  { "codigo": "268", "fone": "0995", "iso": "GE", "iso3": "GEO", "nome": "Geórgia", "nomeFormal": "Geórgia" },
  { "codigo": "276", "fone": "0049", "iso": "DE", "iso3": "DEU", "nome": "Alemanha", "nomeFormal": "República Federal da Alemanha" },
  { "codigo": "288", "fone": "0233", "iso": "GH", "iso3": "GHA", "nome": "Gana", "nomeFormal": "Repúblia de Gana" },
  { "codigo": "292", "fone": "0350", "iso": "GI", "iso3": "GIB", "nome": "Gibraltar", "nomeFormal": "Gibraltar" },
  { "codigo": "300", "fone": "0030", "iso": "GR", "iso3": "GRC", "nome": "Grécia", "nomeFormal": "República Helênica" },
  { "codigo": "304", "fone": "0299", "iso": "GL", "iso3": "GRL", "nome": "Groelândia", "nomeFormal": "Groelândia" },
  { "codigo": "308", "fone": "1473", "iso": "GD", "iso3": "GRD", "nome": "Granada", "nomeFormal": "Granada" },
  { "codigo": "312", "fone": "0590", "iso": "GP", "iso3": "GLP", "nome": "Guadalupe", "nomeFormal": "Guadalupe" },
  { "codigo": "316", "fone": "1671", "iso": "GU", "iso3": "GUM", "nome": "Guão", "nomeFormal": "Território do Guão" },
  { "codigo": "320", "fone": "0502", "iso": "GT", "iso3": "GTM", "nome": "Guatemala", "nomeFormal": "República da Guatemala" },
  { "codigo": "324", "fone": "0224", "iso": "GN", "iso3": "GIN", "nome": "Guiné", "nomeFormal": "República do Guiné" },
  { "codigo": "624", "fone": "0245", "iso": "GW", "iso3": "GNB", "nome": "Guiné-Bissau", "nomeFormal": "República da Guiné-Bissau" },
  { "codigo": "328", "fone": "0592", "iso": "GY", "iso3": "GUY", "nome": "Guiana", "nomeFormal": "República Cooperativa da Guiana" },
  { "codigo": "332", "fone": "0509", "iso": "HT", "iso3": "HTI", "nome": "Haiti", "nomeFormal": "República do Haiti" },
  { "codigo": "334", "fone": "0672", "iso": "HM", "iso3": "HMD", "nome": "Ilhas Heard e McDonald", "nomeFormal": "Território das Ilhas Heard e McDonald" },
  { "codigo": "336", "fone": "0039", "iso": "VA", "iso3": "VAT", "nome": "Vaticano", "nomeFormal": "Estado da Cidade do Vaticano" },
  { "codigo": "340", "fone": "0504", "iso": "HN", "iso3": "HND", "nome": "Honduras", "nomeFormal": "República de Honduras" },
  { "codigo": "344", "fone": "0852", "iso": "HK", "iso3": "HKG", "nome": "Hong Kong", "nomeFormal": "Região Administrativa Especial de Hong Kong da República Popular da China" },
  { "codigo": "348", "fone": "0036", "iso": "HU", "iso3": "HUN", "nome": "Hungria", "nomeFormal": "Hungria" },
  { "codigo": "352", "fone": "0354", "iso": "IS", "iso3": "ISL", "nome": "Islândia", "nomeFormal": "Islândia" },
  { "codigo": "356", "fone": "0091", "iso": "IN", "iso3": "IND", "nome": "Índia", "nomeFormal": "República da Índia" },
  { "codigo": "360", "fone": "0062", "iso": "ID", "iso3": "IDN", "nome": "Indonésia", "nomeFormal": "República da Indonésia" },
  { "codigo": "364", "fone": "0098", "iso": "IR", "iso3": "IRN", "nome": "Iran", "nomeFormal": "República Islâmica do Iran" },
  { "codigo": "368", "fone": "0964", "iso": "IQ", "iso3": "IRQ", "nome": "Iraque", "nomeFormal": "República do Iraque" },
  { "codigo": "372", "fone": "0353", "iso": "IE", "iso3": "IRL", "nome": "Irlanda", "nomeFormal": "Irlanda" },
  { "codigo": "376", "fone": "0972", "iso": "IL", "iso3": "ISR", "nome": "Israel", "nomeFormal": "Estado de Israel" },
  { "codigo": "380", "fone": "0039", "iso": "IT", "iso3": "ITA", "nome": "Itália", "nomeFormal": "República Italiana" },
  { "codigo": "388", "fone": "1876", "iso": "JM", "iso3": "JAM", "nome": "Jamaica", "nomeFormal": "Jamaica" },
  { "codigo": "392", "fone": "0081", "iso": "JP", "iso3": "JPN", "nome": "Japão", "nomeFormal": "Japão" },
  { "codigo": "400", "fone": "0962", "iso": "JO", "iso3": "JOR", "nome": "Jordânia", "nomeFormal": "Reino Hachemita da Jordânia" },
  { "codigo": "398", "fone": "0007", "iso": "KZ", "iso3": "KAZ", "nome": "Cazaquistão", "nomeFormal": "República do Cazaquistão" },
  { "codigo": "404", "fone": "0254", "iso": "KE", "iso3": "KEN", "nome": "Quênia", "nomeFormal": "República do Quênia" },
  { "codigo": "296", "fone": "0686", "iso": "KI", "iso3": "KIR", "nome": "Kiribati", "nomeFormal": "República do Kiribati" },
  { "codigo": "408", "fone": "0850", "iso": "KP", "iso3": "PRK", "nome": "Coreia do Norte", "nomeFormal": "República Democrática Popular da Coreia" },
  { "codigo": "410", "fone": "0082", "iso": "KR", "iso3": "KOR", "nome": "Coreia do Sul", "nomeFormal": "República da Coreia" },
  { "codigo": "414", "fone": "0965", "iso": "KW", "iso3": "KWT", "nome": "Kuwait", "nomeFormal": "Estado do Kuwait" },
  { "codigo": "417", "fone": "0996", "iso": "KG", "iso3": "KGZ", "nome": "Quirguistão", "nomeFormal": "República Quirguiz" },
  { "codigo": "418", "fone": "0856", "iso": "LA", "iso3": "LAO", "nome": "Laos", "nomeFormal": "República Democrática Popular Lau" },
  { "codigo": "428", "fone": "0371", "iso": "LV", "iso3": "LVA", "nome": "Letônia", "nomeFormal": "República da Letônia" },
  { "codigo": "422", "fone": "0961", "iso": "LB", "iso3": "LBN", "nome": "Líbano", "nomeFormal": "República Libanesa" },
  { "codigo": "426", "fone": "0266", "iso": "LS", "iso3": "LSO", "nome": "Lesoto", "nomeFormal": "Reino do Lesoto" },
  { "codigo": "430", "fone": "0231", "iso": "LR", "iso3": "LBR", "nome": "Libéria", "nomeFormal": "República da Libéria" },
  { "codigo": "434", "fone": "0218", "iso": "LY", "iso3": "LBY", "nome": "Líbia", "nomeFormal": "Líbia" },
  { "codigo": "438", "fone": "0423", "iso": "LI", "iso3": "LIE", "nome": "Liechtenstein", "nomeFormal": "Principado de Liechtenstein" },
  { "codigo": "440", "fone": "0370", "iso": "LT", "iso3": "LTU", "nome": "Lituânia", "nomeFormal": "República da Lituânia" },
  { "codigo": "442", "fone": "0352", "iso": "LU", "iso3": "LUX", "nome": "Luxemburgo", "nomeFormal": "Grão-Ducado do Luxemburgo" },
  { "codigo": "446", "fone": "0853", "iso": "MO", "iso3": "MAC", "nome": "Macao", "nomeFormal": "Macao" },
  { "codigo": "807", "fone": "0389", "iso": "MK", "iso3": "MKD", "nome": "Macedônia", "nomeFormal": "República da Macedônia" },
  { "codigo": "450", "fone": "0261", "iso": "MG", "iso3": "MDG", "nome": "Madagascar", "nomeFormal": "República de Madagascar" },
  { "codigo": "454", "fone": "0265", "iso": "MW", "iso3": "MWI", "nome": "Malawi", "nomeFormal": "República de Malawi" },
  { "codigo": "458", "fone": "0060", "iso": "MY", "iso3": "MYS", "nome": "Malásia", "nomeFormal": "Malásia" },
  { "codigo": "462", "fone": "0960", "iso": "MV", "iso3": "MDV", "nome": "Maldivas", "nomeFormal": "Reública de Maldivas" },
  { "codigo": "466", "fone": "0223", "iso": "ML", "iso3": "MLI", "nome": "Mali", "nomeFormal": "República do Mali" },
  { "codigo": "470", "fone": "0356", "iso": "MT", "iso3": "MLT", "nome": "Malta", "nomeFormal": "República de Malta" },
  { "codigo": "584", "fone": "0692", "iso": "MH", "iso3": "MHL", "nome": "Ilhas Marshall", "nomeFormal": "República das Ilhas Marshall" },
  { "codigo": "474", "fone": "0596", "iso": "MQ", "iso3": "MTQ", "nome": "Martinica", "nomeFormal": "Martinica" },
  { "codigo": "478", "fone": "0222", "iso": "MR", "iso3": "MRT", "nome": "Mauritânia", "nomeFormal": "República Islâmica da Mauritânia" },
  { "codigo": "480", "fone": "0230", "iso": "MU", "iso3": "MUS", "nome": "Maurício", "nomeFormal": "República de Maurício" },
  { "codigo": "175", "fone": "0269", "iso": "YT", "iso3": "MYT", "nome": "Mayotte", "nomeFormal": "Departamento de Mayotte" },
  { "codigo": "484", "fone": "0052", "iso": "MX", "iso3": "MEX", "nome": "México", "nomeFormal": "Estados Unidos Mexicanos" },
  { "codigo": "583", "fone": "0691", "iso": "FM", "iso3": "FSM", "nome": "Micronésia", "nomeFormal": "Estados Federados da Micronesia" },
  { "codigo": "498", "fone": "0373", "iso": "MD", "iso3": "MDA", "nome": "Moldova", "nomeFormal": "República de Moldova" },
  { "codigo": "492", "fone": "0377", "iso": "MC", "iso3": "MCO", "nome": "Mônaco", "nomeFormal": "Principado de Mônaco" },
  { "codigo": "496", "fone": "0976", "iso": "MN", "iso3": "MNG", "nome": "Mongólia", "nomeFormal": "Mongólia" },
  { "codigo": "500", "fone": "1664", "iso": "MS", "iso3": "MSR", "nome": "Montserrat", "nomeFormal": "Montserrat" },
  { "codigo": "504", "fone": "0212", "iso": "MA", "iso3": "MAR", "nome": "Marrocos", "nomeFormal": "Reino de Marrocos" },
  { "codigo": "508", "fone": "0258", "iso": "MZ", "iso3": "MOZ", "nome": "Moçambique", "nomeFormal": "República de Moçambique" },
  { "codigo": "104", "fone": "0095", "iso": "MM", "iso3": "MMR", "nome": "Birmânia", "nomeFormal": "República da União de Myanmar" },
  { "codigo": "516", "fone": "0264", "iso": "NA", "iso3": "NAM", "nome": "Namíbia", "nomeFormal": "República da Namíbia" },
  { "codigo": "520", "fone": "0674", "iso": "NR", "iso3": "NRU", "nome": "Nauru", "nomeFormal": "República de Nauru" },
  { "codigo": "524", "fone": "0977", "iso": "NP", "iso3": "NPL", "nome": "Nepal", "nomeFormal": "República Democrática Federativa do Nepal" },
  { "codigo": "528", "fone": "0031", "iso": "NL", "iso3": "NLD", "nome": "Holanda", "nomeFormal": "Holanda" },
  { "codigo": "530", "fone": "0599", "iso": "AN", "iso3": "ANT", "nome": "Antilhas Holandesas", "nomeFormal": "Antilhas Holandesas" },
  { "codigo": "540", "fone": "0687", "iso": "NC", "iso3": "NCL", "nome": "Nova Caledônia", "nomeFormal": "Nova Caledônia" },
  { "codigo": "554", "fone": "0064", "iso": "NZ", "iso3": "NZL", "nome": "Nova Zelândia", "nomeFormal": "Nova Zelândia" },
  { "codigo": "558", "fone": "0505", "iso": "NI", "iso3": "NIC", "nome": "Nicarágua", "nomeFormal": "República da Nicarágua" },
  { "codigo": "562", "fone": "0227", "iso": "NE", "iso3": "NER", "nome": "Niger", "nomeFormal": "República do Niger" },
  { "codigo": "566", "fone": "0234", "iso": "NG", "iso3": "NGA", "nome": "Nigéria", "nomeFormal": "República Federativa da Nigéria" },
  { "codigo": "570", "fone": "0683", "iso": "NU", "iso3": "NIU", "nome": "Niue", "nomeFormal": "Niue" },
  { "codigo": "574", "fone": "0672", "iso": "NF", "iso3": "NFK", "nome": "Ilha Norfolk", "nomeFormal": "Território da Ilha Norfolk" },
  { "codigo": "580", "fone": "1670", "iso": "MP", "iso3": "MNP", "nome": "Ilhas Marianas do Norte", "nomeFormal": "Comunidade das Ilhas Marianas do Norte" },
  { "codigo": "578", "fone": "0047", "iso": "NO", "iso3": "NOR", "nome": "Noruega", "nomeFormal": "Reino da Noruega" },
  { "codigo": "512", "fone": "0968", "iso": "OM", "iso3": "OMN", "nome": "Omã", "nomeFormal": "Sultanato de Omã" },
  { "codigo": "586", "fone": "0092", "iso": "PK", "iso3": "PAK", "nome": "Paquistão", "nomeFormal": "República Islâmica do Paquistão" },
  { "codigo": "585", "fone": "0680", "iso": "PW", "iso3": "PLW", "nome": "Palau", "nomeFormal": "República de Palau" },
  { "codigo": "275", "fone": "0970", "iso": "PS", "iso3": "PSE", "nome": "Palestina", "nomeFormal": "Estado da Palestina" },
  { "codigo": "591", "fone": "0507", "iso": "PA", "iso3": "PAN", "nome": "Panamá", "nomeFormal": "República do Panamá" },
  { "codigo": "598", "fone": "0675", "iso": "PG", "iso3": "PNG", "nome": "Papua-Nova Guiné", "nomeFormal": "Estado Independente da Papua-Nova Guiné" },
  { "codigo": "600", "fone": "0595", "iso": "PY", "iso3": "PRY", "nome": "Paraguai", "nomeFormal": "República do Paraguai" },
  { "codigo": "604", "fone": "0051", "iso": "PE", "iso3": "PER", "nome": "Peru", "nomeFormal": "República do Peru" },
  { "codigo": "608", "fone": "0063", "iso": "PH", "iso3": "PHL", "nome": "Filipinas", "nomeFormal": "República das Filipinas" },
  { "codigo": "612", "fone": "0672", "iso": "PN", "iso3": "PCN", "nome": "Ilhas Picárnia", "nomeFormal": "Ilhas Picárnia" },
  { "codigo": "616", "fone": "0048", "iso": "PL", "iso3": "POL", "nome": "Polônia", "nomeFormal": "República da Polônia" },
  { "codigo": "620", "fone": "0351", "iso": "PT", "iso3": "PRT", "nome": "Portugal", "nomeFormal": "República Portuguesa" },
  { "codigo": "630", "fone": "1787", "iso": "PR", "iso3": "PRI", "nome": "Porto Rico", "nomeFormal": "Comunidade do Porto Rico" },
  { "codigo": "634", "fone": "0974", "iso": "QA", "iso3": "QAT", "nome": "Catar", "nomeFormal": "Estado do Catar" },
  { "codigo": "638", "fone": "0262", "iso": "RE", "iso3": "REU", "nome": "Reunião", "nomeFormal": "Polônia" },
  { "codigo": "642", "fone": "0040", "iso": "RO", "iso3": "ROM", "nome": "Romênia", "nomeFormal": "Romênia" },
  { "codigo": "643", "fone": "0070", "iso": "RU", "iso3": "RUS", "nome": "Rússia", "nomeFormal": "Federação Russa" },
  { "codigo": "646", "fone": "0250", "iso": "RW", "iso3": "RWA", "nome": "Ruanda", "nomeFormal": "República da Ruanda" },
  { "codigo": "654", "fone": "0290", "iso": "SH", "iso3": "SHN", "nome": "Santa Helena", "nomeFormal": "Saint Helena" },
  { "codigo": "659", "fone": "1869", "iso": "KN", "iso3": "KNA", "nome": "São Cristóvão", "nomeFormal": "São Cristóvão" },
  { "codigo": "662", "fone": "1758", "iso": "LC", "iso3": "LCA", "nome": "Santa Lúcia", "nomeFormal": "Santa Lúcia" },
  { "codigo": "666", "fone": "0508", "iso": "PM", "iso3": "SPM", "nome": "São Pedro e Miquelon", "nomeFormal": "Coletividade Territorial de São Pedro e Miquelon" },
  { "codigo": "670", "fone": "1784", "iso": "VC", "iso3": "VCT", "nome": "São Vicente e Granadinas", "nomeFormal": "São Vicente e Granadinas" },
  { "codigo": "882", "fone": "0684", "iso": "WS", "iso3": "WSM", "nome": "Samoa", "nomeFormal": "Estado Independente de Samoa" },
  { "codigo": "674", "fone": "0378", "iso": "SM", "iso3": "SMR", "nome": "São Marino", "nomeFormal": "República de São Marino" },
  { "codigo": "678", "fone": "0239", "iso": "ST", "iso3": "STP", "nome": "Sao Tomé e Príncipe", "nomeFormal": "República Democrática de Sao Tomé e Príncipe" },
  { "codigo": "682", "fone": "0966", "iso": "SA", "iso3": "SAU", "nome": "Arábia Saudita", "nomeFormal": "Reino da Arábia Saudita" },
  { "codigo": "686", "fone": "0221", "iso": "SN", "iso3": "SEN", "nome": "Senegal", "nomeFormal": "República do Senegal" },
  { "codigo": "688", "fone": "0381", "iso": "CS", "iso3": "SRB", "nome": "Sérvia e Montenegro", "nomeFormal": "União Estatal de Sérvia e Montenegro" },
  { "codigo": "690", "fone": "0248", "iso": "SC", "iso3": "SYC", "nome": "Seicheles", "nomeFormal": "República das Seicheles" },
  { "codigo": "694", "fone": "0232", "iso": "SL", "iso3": "SLE", "nome": "República da Serra Leoa", "nomeFormal": "República da Serra Leoa" },
  { "codigo": "702", "fone": "0065", "iso": "SG", "iso3": "SGP", "nome": "Singapura", "nomeFormal": "República da Singapura" },
  { "codigo": "703", "fone": "0421", "iso": "SK", "iso3": "SVK", "nome": "Eslováquia", "nomeFormal": "República Eslovaca" },
  { "codigo": "705", "fone": "0386", "iso": "SI", "iso3": "SVN", "nome": "Eslovênia", "nomeFormal": "República da Eslovênia" },
  { "codigo": "090", "fone": "0677", "iso": "SB", "iso3": "SLB", "nome": "Ilhas Salomão", "nomeFormal": "Ilhas Salomão" },
  { "codigo": "706", "fone": "0252", "iso": "SO", "iso3": "SOM", "nome": "Somália", "nomeFormal": "República da Somália" },
  { "codigo": "710", "fone": "0027", "iso": "ZA", "iso3": "ZAF", "nome": "África do Sul", "nomeFormal": "República da África do Sul" },
  { "codigo": "239", "fone": "0500", "iso": "GS", "iso3": "SGS", "nome": "Ilhas Geórgia do Sul e Sandwich do Sul", "nomeFormal": "Ilhas Geórgia do Sul e Sandwich do Sul" },
  { "codigo": "724", "fone": "0034", "iso": "ES", "iso3": "ESP", "nome": "Espanha", "nomeFormal": "Reino da Espanha" },
  { "codigo": "144", "fone": "0094", "iso": "LK", "iso3": "LKA", "nome": "Sri Lanka", "nomeFormal": "República Democrática Socialista do Sri Lanka" },
  { "codigo": "736", "fone": "0249", "iso": "SD", "iso3": "SDN", "nome": "Sudão", "nomeFormal": "República do Sudão" },
  { "codigo": "740", "fone": "0597", "iso": "SR", "iso3": "SUR", "nome": "Suriname", "nomeFormal": "República do Suriname" },
  { "codigo": "744", "fone": "0047", "iso": "SJ", "iso3": "SJM", "nome": "Esvalbarde", "nomeFormal": "Esvalbarde" },
  { "codigo": "748", "fone": "0268", "iso": "SZ", "iso3": "SWZ", "nome": "Suazilândia", "nomeFormal": "Reino da Suazilândia" },
  { "codigo": "752", "fone": "0046", "iso": "SE", "iso3": "SWE", "nome": "Suécia", "nomeFormal": "Reino da Suécia" },
  { "codigo": "756", "fone": "0041", "iso": "CH", "iso3": "CHE", "nome": "Suiça", "nomeFormal": "Confederação Suiça" },
  { "codigo": "760", "fone": "0963", "iso": "SY", "iso3": "SYR", "nome": "Síria", "nomeFormal": "República Árabe Síria" },
  { "codigo": "158", "fone": "0886", "iso": "TW", "iso3": "TWN", "nome": "Taiwan", "nomeFormal": "Taiwan" },
  { "codigo": "762", "fone": "0992", "iso": "TJ", "iso3": "TJK", "nome": "Tajiquistão", "nomeFormal": "República do Tajiquistão" },
  { "codigo": "834", "fone": "0255", "iso": "TZ", "iso3": "TZA", "nome": "Tanzânia", "nomeFormal": "República Unida da Tanzânia" },
  { "codigo": "764", "fone": "0066", "iso": "TH", "iso3": "THA", "nome": "Tailândia", "nomeFormal": "Reino da Tailândia" },
  { "codigo": "626", "fone": "0670", "iso": "TL", "iso3": "TLS", "nome": "Timor-Leste", "nomeFormal": "República Democrática de Timor-Leste" },
  { "codigo": "768", "fone": "0228", "iso": "TG", "iso3": "TGO", "nome": "Togo", "nomeFormal": "República Togolesa" },
  { "codigo": "772", "fone": "0690", "iso": "TK", "iso3": "TKL", "nome": "Toquelau", "nomeFormal": "Toquelau" },
  { "codigo": "776", "fone": "0676", "iso": "TO", "iso3": "TON", "nome": "Tonga", "nomeFormal": "Reino de Tonga" },
  { "codigo": "780", "fone": "1868", "iso": "TT", "iso3": "TTO", "nome": "Trinidad e Tobago", "nomeFormal": "República da Trinidad e Tobago" },
  { "codigo": "788", "fone": "0216", "iso": "TN", "iso3": "TUN", "nome": "Tunísia", "nomeFormal": "República da Tunísia" },
  { "codigo": "792", "fone": "0090", "iso": "TR", "iso3": "TUR", "nome": "Turquia", "nomeFormal": "República da Turquia" },
  { "codigo": "795", "fone": "7370", "iso": "TM", "iso3": "TKM", "nome": "Turcomenistão", "nomeFormal": "Turcomenistão" },
  { "codigo": "796", "fone": "1649", "iso": "TC", "iso3": "TCA", "nome": "Ilhas Turks e Caicos", "nomeFormal": "Ilhas Turks e Caicos" },
  { "codigo": "798", "fone": "0688", "iso": "TV", "iso3": "TUV", "nome": "Tuvalu", "nomeFormal": "Tuvalu" },
  { "codigo": "800", "fone": "0256", "iso": "UG", "iso3": "UGA", "nome": "Uganda", "nomeFormal": "República de Uganda" },
  { "codigo": "804", "fone": "0380", "iso": "UA", "iso3": "UKR", "nome": "Ucrânia", "nomeFormal": "Ucrânia" },
  { "codigo": "784", "fone": "0971", "iso": "AE", "iso3": "ARE", "nome": "Emirados Árabes", "nomeFormal": "Emirados Árabes Unidos" },
  { "codigo": "826", "fone": "0044", "iso": "GB", "iso3": "GBR", "nome": "Reino Unido", "nomeFormal": "Reino Unido da Grã-Bretanha e Irlanda do Norte" },
  { "codigo": "840", "fone": "0001", "iso": "US", "iso3": "USA", "nome": "Estados Unidos", "nomeFormal": "Estados Unidos da América" },
  { "codigo": "581", "fone": "0001", "iso": "UM", "iso3": "UMI", "nome": "Ilhas Menores Distantes dos Estados Unidos", "nomeFormal": "Ilhas Menores Distantes dos Estados Unidos" },
  { "codigo": "858", "fone": "0598", "iso": "UY", "iso3": "URY", "nome": "Uruguai", "nomeFormal": "República Oriental do Uruguai" },
  { "codigo": "860", "fone": "0998", "iso": "UZ", "iso3": "UZB", "nome": "Uzbequistão", "nomeFormal": "República do Uzbequistão" },
  { "codigo": "548", "fone": "0678", "iso": "VU", "iso3": "VUT", "nome": "Vanuatu", "nomeFormal": "República de Vanuatu" },
  { "codigo": "862", "fone": "0058", "iso": "VE", "iso3": "VEN", "nome": "Venezuela", "nomeFormal": "República Bolivariana da Venezuela" },
  { "codigo": "704", "fone": "0084", "iso": "VN", "iso3": "VNM", "nome": "Vietnam", "nomeFormal": "República Socialista do Vietnam" },
  { "codigo": "092", "fone": "1284", "iso": "VG", "iso3": "VGB", "nome": "Ilhas Virgens Inglesas", "nomeFormal": "Ilhas Virgens" },
  { "codigo": "850", "fone": "1340", "iso": "VI", "iso3": "VIR", "nome": "Ilhas Virgens (USA)", "nomeFormal": "Ilhas Virgens dos Estados Unidos" },
  { "codigo": "876", "fone": "0681", "iso": "WF", "iso3": "WLF", "nome": "Wallis e Futuna", "nomeFormal": "Wallis e Futuna" },
  { "codigo": "732", "fone": "0212", "iso": "EH", "iso3": "ESH", "nome": "Saara Ocidental", "nomeFormal": "Saara Ocidental" },
  { "codigo": "887", "fone": "0967", "iso": "YE", "iso3": "YEM", "nome": "Iêmen", "nomeFormal": "República do Iêmen" },
  { "codigo": "894", "fone": "0260", "iso": "ZM", "iso3": "ZMB", "nome": "Zâmbia", "nomeFormal": "República do Zâmbia" },
  { "codigo": "716", "fone": "0263", "iso": "ZW", "iso3": "ZWE", "nome": "Zimbábue", "nomeFormal": "República do Zimbábue" }

]

const firestore = getFirestore();

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {
  popError = inject(ErrorSnackBarService);
  popSuccess = inject(DialogService);


  saveRegister = (data: IRegister) => {
    const register = doc(firestore, 'register', data.phone);
    try {
      setDoc(register, data);
      this.popSuccess.openDialogSuccess();

      console.log("Document written with ID: ", register.id);
    } catch (e) {
      this.popError.openErrorSnackBar(3000, e as string);
    }
  }


  saveddiWithPromise = () => {
    try {
      fireBaseddiData.forEach((element: IDdi) => {
        const docLocal = doc(firestore, 'ddi', element.nome);
        const ddi = setDoc(docLocal, element, { merge: true });
      });
    } catch (error) {
      this.popError.openErrorSnackBar(20000, error as string);
    }
  }


  saveDDIObservable = () => {
    let setLocal;
    fireBaseddiData.forEach((element: IDdi) => {
      const docLocal = doc(firestore, 'ddiObservable', element.fone);
     setLocal = setDoc(docLocal, element, { merge: true });
     from(setLocal);

    });

  }


}
