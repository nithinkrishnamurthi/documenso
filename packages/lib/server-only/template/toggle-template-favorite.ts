import { EnvelopeType } from '@prisma/client';

import { prisma } from '@documenso/prisma';

import { type EnvelopeIdOptions } from '../../utils/envelope';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id';

export type ToggleTemplateFavoriteOptions = {
  id: EnvelopeIdOptions;
  userId: number;
  teamId: number;
};

export const toggleTemplateFavorite = async ({
  id,
  userId,
  teamId,
}: ToggleTemplateFavoriteOptions) => {
  const { envelopeWhereInput } = await getEnvelopeWhereInput({
    id,
    type: EnvelopeType.TEMPLATE,
    userId,
    teamId,
  });

  const current = await prisma.envelope.findUniqueOrThrow({
    where: envelopeWhereInput,
    select: { favorited: true },
  });

  const updated = await prisma.envelope.update({
    where: envelopeWhereInput,
    data: { favorited: !current.favorited },
    select: { favorited: true },
  });

  return { favorited: updated.favorited };
};
