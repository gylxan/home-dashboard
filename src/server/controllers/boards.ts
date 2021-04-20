import { Router } from 'express';
const router = Router();

export const ROUTE = '/boards';
// Root without parameter
router.route('/').get((req, res) => {
  res.send([
    {
      name: 'skipbo',
      label: 'Skip-Bo',
      description: 'Statistiken und Auswertungen zu unseren Skip-Bo-Spielen',
    },
    {
      name: 'entscheidomat',
      label: 'Entscheidomat',
      description: 'Wenn man sich mal wieder nicht entscheiden kann: Nimm den Entscheidomat!',
    },
    {
      name: 'light',
      label: 'Licht',
      description: 'Licht zuhause steuern',
    },
  ]);
});

export default router;
