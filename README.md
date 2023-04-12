# Dashboards-Sustainability-MPropAPI

### GOALS:

1. Provide a Template to build a simple Carbon Cost Calculator, specifically leveraging the Model Properties API to aggregate the Material Quantities.  Model Properties API pulls Model data, to calculate a histogram of Materials and their total Volume, Area, Length.  Each Material is then matched to a Carbon Cost (taken manually from an EPD database).  See Note #3, below
2. Can Model Derivative API Team expose the hidden Layered Materials by adding the C# code found in Note #1 (below)

### NOTES:

1. Revit C# Source code to Extract Hidden Layers is here: https://github.com/JoaoMartins-callmeJohn/da4r-extractmaterialquantities/blob/main/ExtractMaterials.cs 
2. Example of using this DLL in DA4Revit and formatted into Interface for OneClick LCA API is here: https://github.com/wallabyway/compositeLayersExtractor
3. A Sample Revit file, containing an example of compound materials, can be found '/Revit-Sample'.  Compare the results found in the AU presentation in #4 and #5 below:
4. See the presentation slides: https://docs.google.com/presentation/d/1nKkGv_GEnccQVT4E2a8U0TxZVuR41nt6S8q_ymNdGx4/edit?usp=sharing
5. See the AU Talk here: https://www.autodesk.com/autodesk-university/class/Design-Zero-Carbon-Decarbonizing-Revit-House-together-2022

![banner](https://user-images.githubusercontent.com/440241/231312428-29685e40-bafa-4eb9-84d7-162787a2a3d3.png)

<hr>

![platforms](https://img.shields.io/badge/platform-windows%20%7C%20osx%20%7C%20linux-lightgray.svg)
[![node.js](https://img.shields.io/badge/Node.js-16.16-blue.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-8.11-blue.svg)](https://www.npmjs.com/)
[![license](https://img.shields.io/:license-mit-green.svg)](https://opensource.org/licenses/MIT)



[Autodesk Platform Services](https://aps.autodesk.com) application built by following
the [Hubs Browser](https://tutorials.autodesk.io/tutorials/hubs-browser/) tutorial
from https://tutorials.autodesk.io.

![thumbnail](thumbnail.png)

## Development

### Prerequisites

- [APS credentials](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/create-app)
- Provisioned access to [BIM 360 Docs](https://forge.autodesk.com/en/docs/bim360/v1/tutorials/getting-started/manage-access-to-docs/)
or Autodesk Construction Cloud
- [Node.js](https://nodejs.org) (we recommend the Long Term Support version)
- Terminal (for example, [Windows Command Prompt](https://en.wikipedia.org/wiki/Cmd.exe)
or [macOS Terminal](https://support.apple.com/guide/terminal/welcome/mac))

### Setup & Run

- Clone this repository
- Install dependencies: `yarn install` or `npm install`
- Setup environment variables:
  - `APS_CLIENT_ID` - your APS application client ID
  - `APS_CLIENT_SECRET` - your APS application client secret
  - `APS_CALLBACK_URL` - URL for your users to be redirected to after they successfully log in with their Autodesk account
    - For local development, the callback URL is `http://localhost:8080/api/auth/callback`
    - For applications deployed to a custom domain, the callback URL is `http://<your-domain>/api/auth/callback` or `https://<your-domain>/api/auth/callback`
    - Do not forget to update the callback URL for your application in https://forge.autodesk.com/myapps as well
  - `SERVER_SESSION_SECRET` - arbitrary phrase used to encrypt/decrypt server session cookies
- Run the server: `yarn start` or `npm start`

> When using [Visual Studio Code](https://code.visualstudio.com),
you can specify the env. variables listed above in a _.env_ file in this
folder, and run & debug the application directly from the editor.

## Troubleshooting

Please contact us via https://forge.autodesk.com/en/support/get-help.

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for more details.
