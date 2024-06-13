const User = require('../modulers/user')
const Ticket = require("../modulers/ticket")
const bcrypt = require("bcrypt")
const moment = require('moment')

class adminController {
    signIn(req, res) {
        res.render('admin/signIn');
    }
    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            console.log(user)
            if (!user) {
                return res.render('admin/signIn', { error: 'Tài khoản không tồn tại' });
            } else {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (validPassword) {
                    res.cookie("uid", user.id);
                    res.statusCode = 302;
                    res.setHeader('Location', '/admin/viewUsers');
                    res.end();
                } else {
                    return res.render('admin/signIn', { error: 'Mật khẩu không chính xác' });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await User.find().lean();
            res.render('admin/all-user', { users });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { username, email, phone } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email, phone },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }

            return res.status(200).json({
                message: 'Cập nhật thông tin người dùng thành công',
                user: updatedUser
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            await Ticket.deleteMany({ user: req.params.id });
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send('User Deleted');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    async addUser(req, res, next) {
        try {
            const { username, password, name, email, phone, address, role } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({ username, password: hashedPassword, email, phone, name, address, role });
            await user.save();
            res.status(200).send('User Added');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await User.findById(req.params.id).lean();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    async editUser(req, res, next) {
        try {
            const { username, password, name, email, phone, address, role } = req.body;
            await User.findByIdAndUpdate(req.params.id, { username, password, name, email, phone, address, role });
            res.redirect('/users');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    async viewTicket(req, res, next) {
        const tickets = await Ticket.find();

        // Get current date
        const currentDate = moment().format('YYYY-MM-DD');

        // Update isExpired status based on current date
        tickets.forEach(ticket => {
            if (moment(ticket.date).isBefore(currentDate)) {
                ticket.isExpired = true;
            }
        });

        // Bulk update tickets with isExpired status
        const bulkOps = tickets.map(ticket => ({
            updateOne: {
                filter: { _id: ticket._id },
                update: { isExpired: ticket.isExpired }
            }
        }));

        if (bulkOps.length > 0) {
            await Ticket.bulkWrite(bulkOps);
        }

        res.render('admin/orders', { tickets });
    }
    async markAsCollected(req, res, next) {
        try {
            const ticket = await Ticket.findById(req.params.id);
            console.log(ticket)
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
    
            ticket.isCollected = true;
            console.log(ticket.isCollected)
            await ticket.updateOne({ isCollected: true });
    
            res.status(200).json({ message: 'Ticket marked as collected' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
        
}

module.exports = new adminController()