import { Query } from '../';
import type { TChrips, TUsers } from '../models';

const all = () =>
	Query<Array<TChrips | TUsers>>(`
    SELECT
        chrips.*,
        users.name
    FROM chrips
    JOIN users ON users.id = chrips.userid
   
`);

const one = (id: number) =>
	Query<Array<TChrips | TUsers>>(
		`
    SELECT
        chrips.*,
        users.name
    FROM chrips
    JOIN users ON users.id = chrips.userid
    WHERE chrips.id = ?
`,
		[id]
	);

const insert = (userid: number, content: string) =>
	Query<{ insertId: number }>(`INSERT INTO chrips (userid, content) VALUE (?)`, [[userid, content]]);

const update = (id: number, content: string) => Query(`UPDATE chirps SET content = ? WHERE id = ?`, [content, id]);

const destroy = (id: number) => Query(`DELETE FROM chrips WHERE id = ?`, [id]);

export default {
	all,
	one,
	insert,
	update,
	destroy
};